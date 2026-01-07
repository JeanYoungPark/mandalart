import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/admin';

// GET /api/mandalarts/[id] - 특정 만달아트 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Mandalart not found' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/mandalarts/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mandalart' },
      { status: 500 }
    );
  }
}

// PUT /api/mandalarts/[id] - 만달아트 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const { data, error } = await supabaseAdmin
      .from('mandalarts')
      // @ts-ignore - Supabase type inference issue
      .update({ year, title, values })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Mandalart not found' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('PUT /api/mandalarts/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update mandalart' },
      { status: 500 }
    );
  }
}

// DELETE /api/mandalarts/[id] - 만달아트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const { error } = await supabaseAdmin
      .from('mandalarts')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/mandalarts/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete mandalart' },
      { status: 500 }
    );
  }
}
