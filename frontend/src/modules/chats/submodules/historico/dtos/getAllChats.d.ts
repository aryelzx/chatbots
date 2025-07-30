type GetAllChatsInputDto = {
  id_user: number;
}
type GetAllChatsOutputDto = {
  chats: IChat[];
}

export type { GetAllChatsInputDto, GetAllChatsOutputDto };