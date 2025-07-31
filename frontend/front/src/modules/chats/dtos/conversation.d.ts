type messageInputDto = {
  user_id: string;
  prompt_input_text: string;
  context?: string;
  tipo: string;
  send_by: string;
  created_by?: string;
}

type messageOutputDto = {
  id: number;
  chat_id: number;
  user_id: number;
  mensagem: string;
  prompt_input_text: string;
  tipo: string;
  prompt_context?: string;
  prompt_role?: string;
  prompt_modelo?: string;
  send_by: string;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { messageInputDto, messageOutputDto };