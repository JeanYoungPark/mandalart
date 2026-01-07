export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      mandalarts: {
        Row: {
          id: string
          user_id: string
          year: number
          title: string
          values: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          year: number
          title: string
          values?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          year?: number
          title?: string
          values?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export interface Mandalart {
  id: string;
  user_id: string;
  year: number;
  title: string;
  values: string[][];
  created_at: string;
  updated_at: string;
}
