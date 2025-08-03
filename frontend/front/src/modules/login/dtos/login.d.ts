import type { IUser } from "@/modules/usuarios/interfaces/user-interface";

type LoginInputDto = {
  cpf: string;
  senha: string;
}
type LoginOutputDto = {
  token: string;
  usuario: IUser;
};

type RegisterInputDto = {
  role: string; // 'A' = Admin, 'U' = User
  email?: string;
  nome?: string;
  cpf: string;
  senha: string;
}

type RegisterOutputDto = {
  user: IUser;
}

export type { LoginInputDto, LoginOutputDto, RegisterInputDto, RegisterOutputDto };