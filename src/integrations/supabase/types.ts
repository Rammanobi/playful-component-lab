export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      day_descriptions: {
        Row: {
          date: string
          description: string
          id: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          date: string
          description: string
          id?: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          date?: string
          description?: string
          id?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meal_logs: {
        Row: {
          date: string
          description: string | null
          id: string
          time: string
          timestamp: string | null
          title: string
          user_id: string
        }
        Insert: {
          date: string
          description?: string | null
          id?: string
          time: string
          timestamp?: string | null
          title: string
          user_id: string
        }
        Update: {
          date?: string
          description?: string | null
          id?: string
          time?: string
          timestamp?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      skincare_logs: {
        Row: {
          date: string
          id: string
          moisturizer: boolean | null
          reminder_time: string
          serum1: boolean | null
          serum2: boolean | null
          sunscreen: boolean | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          date: string
          id?: string
          moisturizer?: boolean | null
          reminder_time: string
          serum1?: boolean | null
          serum2?: boolean | null
          sunscreen?: boolean | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          date?: string
          id?: string
          moisturizer?: boolean | null
          reminder_time?: string
          serum1?: boolean | null
          serum2?: boolean | null
          sunscreen?: boolean | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sleep_logs: {
        Row: {
          date: string
          hours_slept: number
          id: string
          morning_reminder: string | null
          quality: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          date: string
          hours_slept: number
          id?: string
          morning_reminder?: string | null
          quality: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          date?: string
          hours_slept?: number
          id?: string
          morning_reminder?: string | null
          quality?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stress_logs: {
        Row: {
          date: string
          id: string
          notes: string | null
          rating: number
          timestamp: string | null
          user_id: string
        }
        Insert: {
          date: string
          id?: string
          notes?: string | null
          rating: number
          timestamp?: string | null
          user_id: string
        }
        Update: {
          date?: string
          id?: string
          notes?: string | null
          rating?: number
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
