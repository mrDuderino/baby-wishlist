export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProductStatus = "available" | "reserved" | "purchased" | "hidden";

export type ReservationStatus =
  "pending" | "confirmed" | "cancelled" | "purchased";

export type MarketplaceLink = {
  title: string;
  url: string;
  price?: number;
  icon?: string;
  badge?: string;
};

export interface Database {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          id: string;
          admin_id: string | null;
          action: string;
          entity: string;
          entity_id: string | null;
          old_value: Json | null;
          new_value: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          action: string;
          entity: string;
          entity_id?: string | null;
          old_value?: Json | null;
          new_value?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string | null;
          action?: string;
          entity?: string;
          entity_id?: string | null;
          old_value?: Json | null;
          new_value?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          emoji: string;
          description: string;
          sort_order: number;
          visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          emoji?: string;
          description?: string;
          sort_order?: number;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          emoji?: string;
          description?: string;
          sort_order?: number;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          title: string;
          slug: string;
          short_description: string;
          description: string;
          reason_selected: string;
          price: number | null;
          currency: string;
          status: ProductStatus;
          priority: number;
          featured: boolean;
          visible: boolean;
          cover_image: string | null;
          gallery: Json;
          marketplace_links: Json;
          reservation_id: string | null;
          sort_order: number;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          title: string;
          slug: string;
          short_description?: string;
          description?: string;
          reason_selected?: string;
          price?: number | null;
          currency?: string;
          status?: ProductStatus;
          priority?: number;
          featured?: boolean;
          visible?: boolean;
          cover_image?: string | null;
          gallery?: Json;
          marketplace_links?: Json;
          reservation_id?: string | null;
          sort_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          title?: string;
          slug?: string;
          short_description?: string;
          description?: string;
          reason_selected?: string;
          price?: number | null;
          currency?: string;
          status?: ProductStatus;
          priority?: number;
          featured?: boolean;
          visible?: boolean;
          cover_image?: string | null;
          gallery?: Json;
          marketplace_links?: Json;
          reservation_id?: string | null;
          sort_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      reservations: {
        Row: {
          id: string;
          product_id: string;
          guest_name: string;
          telegram: string | null;
          phone: string | null;
          comment: string | null;
          status: ReservationStatus;
          expires_at: string;
          confirmed_at: string | null;
          cancelled_at: string | null;
          purchased_at: string | null;
          created_at: string;
          updated_at: string;
          ip_address: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          guest_name: string;
          telegram?: string | null;
          phone?: string | null;
          comment?: string | null;
          status?: ReservationStatus;
          expires_at?: string;
          confirmed_at?: string | null;
          cancelled_at?: string | null;
          purchased_at?: string | null;
          created_at?: string;
          updated_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          guest_name?: string;
          telegram?: string | null;
          phone?: string | null;
          comment?: string | null;
          status?: ReservationStatus;
          expires_at?: string;
          confirmed_at?: string | null;
          cancelled_at?: string | null;
          purchased_at?: string | null;
          created_at?: string;
          updated_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      settings: {
        Row: {
          key: string;
          value: Json;
          is_public: boolean;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: Json;
          is_public?: boolean;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          is_public?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_reservation: {
        Args: {
          p_product_id: string;
          p_guest_name: string;
          p_telegram?: string | null;
          p_phone?: string | null;
          p_comment?: string | null;
          p_ip_address?: string | null;
          p_user_agent?: string | null;
        };
        Returns: string;
      };
      expire_pending_reservations: {
        Args: Record<string, never>;
        Returns: number;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      product_status: ProductStatus;
      reservation_status: ReservationStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Category = Tables<"categories">;
export type Product = Tables<"products">;
export type Reservation = Tables<"reservations">;
export type Setting = Tables<"settings">;
export type Profile = Tables<"profiles">;
export type AuditLog = Tables<"audit_logs">;
