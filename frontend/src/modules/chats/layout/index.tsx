import { useUserContext } from "@/modules/login/context/useUserContext";
import {
	Layout,
	type Breadcrumb,
	type SidebarButton,
} from "@/shared/components/layout";
import { BotIcon, MessageSquareText, MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";

export type Children = {
	children: React.ReactNode;
};

const ChatsLayout = ({ children }: Children) => {
	const { user } = useUserContext();
	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
		{ label: "Chats", path: "/chats" },
	]);

	const asideButtons: SidebarButton[] = [
		{
			icon: <MessageSquareText />,
			label: "Chats",
			path: "/chats",
			disabled: user.value.hasChat ? false : true,
		},
		{
			icon: <BotIcon />,
			label: "Criar novo chat",
			path: "/chats/create",
			disabled: false,
		},
		{
			icon: <MessagesSquare />,
			label: "Histórico de chats",
			path: "/chats/historico",
			disabled: user.value.hasChat ? false : true,
		},
	];

	const handleBreadcrumbs = () => {
		const currentPath = location.pathname;
		if (currentPath === "/chats") return;

		for (const { label, path } of asideButtons) {
			if (
				path === currentPath &&
				!breadcrumbs.some((item) => item.label === label)
			) {
				if (breadcrumbs.length > 1) {
					setBreadcrumbs([breadcrumbs[0], { label, path }]);
					return;
				}
				setBreadcrumbs([...breadcrumbs, { label, path }]);
			}
		}
	};

	useEffect(() => {
		handleBreadcrumbs();
	}, [location]);

	return (
		<Layout sidebarButtons={asideButtons} breadcrumbs={breadcrumbs}>
			{children}
		</Layout>
	);
};

export { ChatsLayout };
