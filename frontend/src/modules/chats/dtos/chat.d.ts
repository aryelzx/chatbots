import type { IChat } from "../interfaces/chat.interface";

export type ChatInputDto = {
  id_chat?: number;
  user_id?: number;
  nome?: string;
}

export type ChatOutputDto = {
  chats: IChat
}