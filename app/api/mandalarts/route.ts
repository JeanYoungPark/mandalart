import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/admin';

// GET /api/mandalarts - 모든 만달아트 조회
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userResult = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single() as { data: { id: string } | null; error: any };

    if (userResult.error || !userResult.data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.data.id;

    const { data, error } = await supabaseAdmin
      .from('mandalarts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/mandalarts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mandalarts' },
      { status: 500 }
    );
  }
}

// POST /api/mandalarts - 새 만달아트 생성
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userResult = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single() as { data: { id: string } | null; error: any };

    if (userResult.error || !userResult.data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.data.id;

    const body = await request.json();
    const { year, title, values } = body;

    // 유효성 검사
    if (!year) {
      return NextResponse.json(
        { error: 'Year is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('mandalarts')
      // @ts-ignore - Supabase type inference issue
      .insert({
        user_id: userId,
        year,
        title,
        values: values || Array.from({ length: 9 }, () => Array(9).fill('')),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('POST /api/mandalarts error:', error);
    return NextResponse.json(
      { error: 'Failed to create mandalart' },
      { status: 500 }
    );
  }
}
