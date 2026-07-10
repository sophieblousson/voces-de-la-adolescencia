/**
 * Tipos de la base de datos.
 *
 * Este archivo es un placeholder escrito a mano para poder tipar los
 * clientes de Supabase desde la Etapa 0. En la Etapa 2, después de correr
 * las migraciones, se reemplaza por el archivo generado automáticamente con:
 *
 *   supabase gen types typescript --project-id <id> > types/database.types.ts
 *
 * Mientras tanto, mantiene sincronizado el shape de `submissions` y
 * `profiles` con lo definido en el documento de arquitectura MVP.
 */

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: "admin" | "jurado";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role: "admin" | "jurado";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: "admin" | "jurado";
          created_at?: string;
        };
        Relationships: [];
      };
      submissions: {
        Row: {
          id: string;
          code: string;
          created_at: string;
          updated_at: string;
          student_name: string;
          student_email: string;
          student_grade: "7N" | "8N" | "9N" | "10N" | "11N" | "12N";
          school: string;
          teacher_name: string | null;
          category: "poesia" | "cuento_breve" | "ensayo_personal";
          title: string;
          pseudonym: string;
          file_path: string | null;
          file_name: string | null;
          file_type: "doc" | "docx" | "pdf" | null;
          file_size: number | null;
          declaration_original: boolean;
          declaration_no_ai: boolean;
          declaration_terms: boolean;
          declaration_evaluation: boolean;
          declaration_publication: boolean;
          status:
            | "recibido"
            | "en_revision"
            | "preseleccionado"
            | "finalista"
            | "ganador"
            | "descartado";
          internal_notes: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["submissions"]["Row"],
          "id" | "created_at" | "updated_at" | "status"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: Database["public"]["Tables"]["submissions"]["Row"]["status"];
        };
        Update: Partial<Database["public"]["Tables"]["submissions"]["Row"]>;
        Relationships: [];
      };
    };
    Views: {
      incomplete_submissions: {
        Row: {
          id: string;
          code: string;
          created_at: string;
        };
        Relationships: [];
      };
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
