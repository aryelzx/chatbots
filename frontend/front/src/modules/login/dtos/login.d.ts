import type { IUser } from "@/modules/usuarios/interfaces/user-interface";

type LoginInputDto = {
  cpf: string;
  senha: string;
}
type LoginOutputDto = {
  token: string;
  usuario: IUser;
};
export type { LoginInputDto, LoginOutputDto };