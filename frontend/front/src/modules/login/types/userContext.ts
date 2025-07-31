import type { IUser } from "@/modules/usuarios/interfaces/user-interface";

type UserContextType = {
	user: {
		value: IUser;
		set: React.Dispatch<IUser>;
	};
};

export type { UserContextType };