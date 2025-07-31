export interface IChat {
  id: number;
  context: string;
  nome: string;
  modelo: string;
  descricao?: string;
  status: string;
  user_id: number;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}