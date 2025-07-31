import type { IChat } from "@/modules/chats/interfaces/chat.interface";

export type CreateChatInputDto = {
	context: string;
	nome: string;
	modelo: string;
	descricao?: string;
	status: string;
	user_id: number;
};

export type CreateChatOutputDto = {
	chat: IChat;
};
  