import type { IChat } from "@/modules/chats/interfaces/chat.interface";

export interface IUser {
  id: string;
  nome: string;
  email: string;
  role: string;
  cpf: string;
  hasChat: boolean;
  latestChat?: IChat; 
}