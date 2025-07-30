import type { IChat } from "@/modules/chats/interfaces/chat.interface";

type UpdateChatInputDto = {
  id_chat: string;
  chat: IChat
};

type UpdateChatOutputDto = {
  chat: IChat
};

export type { UpdateChatInputDto, UpdateChatOutputDto };