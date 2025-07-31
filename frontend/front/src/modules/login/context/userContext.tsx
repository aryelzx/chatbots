import React, { createContext, useState } from "react";
import type { UserContextType } from "../types/userContext";
import type { IUser } from "@/modules/usuarios/interfaces/user-interface";

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser>(() => {
		const userLocalStorage = localStorage.getItem("@chatbots_user");
		if (!userLocalStorage) return {} as IUser;
		return JSON.parse(userLocalStorage);
	});

	const values: UserContextType = {
		user: {
			value: user,
			set: setUser,
		},
	};
	return (
		<UserContext.Provider value={values}>{children}</UserContext.Provider>
	);
};



export { UserContextProvider, UserContext };
