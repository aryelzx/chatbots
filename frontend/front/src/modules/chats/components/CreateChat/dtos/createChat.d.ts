export type CreateChatInputDto = {
  context: string;
  nome: string;
  modelo: string;
  descricao?: string;
  status: string;
  user_id: number;
};