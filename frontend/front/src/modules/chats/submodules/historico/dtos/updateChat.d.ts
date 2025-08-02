import type { IChat } from "@/modules/chats/interfaces/chat.interface";

type UpdateChatInputDto = {
  id_user: string;
  chat: IChat
};

type UpdateChatOutputDto = {
  chat: IChat
};

export type { UpdateChatInputDto, UpdateChatOutputDto };