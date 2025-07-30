import type { RouteObject } from "react-router-dom";
import { ChatsPage } from "../pages";
import { HistoricoChatsPage } from "../submodules/historico/pages";

const chatRoutes: RouteObject[] = [
	{
		path: "/chats",
		element: <ChatsPage />,
		// loader: authLoader
	},
	{
		path: "/chats/historico",
		element: <HistoricoChatsPage />,
		// loader: authLoader
	},
];

export { chatRoutes };
