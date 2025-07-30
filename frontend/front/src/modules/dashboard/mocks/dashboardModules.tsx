import { ChartBar, Users } from "lucide-react";
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
			title: "Atendimento ao Paciente",
			description: "Realize triagens, teleinterconsultas e mais.",
			path: "/atendimento-paciente",
			disabled: false,
			icon: <ChartBar />,
		}
	];
	return {
		modules,
	};
};

export { dashboardModules };
