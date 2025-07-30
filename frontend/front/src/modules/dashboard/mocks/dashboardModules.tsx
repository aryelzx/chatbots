import { Bot, Users } from "lucide-react";
import type { JSX } from "react";

type DashboardModule = {
	icon: JSX.Element;
	title: string;
	description: string;
	path: string;
	disabled?: boolean;
};

const dashboardModules = () => {
	const modules: DashboardModule[] = [
		{
			title: "Usuários",
			description: "Gerenciamento de usuários da aplicação.",
			path: "/usuarios",
			disabled: false,
			icon: <Users />,
		},
		{
			title: "Chats",
			description: "Gerenciamento de chats e mensagens.",
			path: "/chats",
			disabled: false,
			icon: <Bot />,
		}
	];
	return {
		modules,
	};
};

export { dashboardModules };
