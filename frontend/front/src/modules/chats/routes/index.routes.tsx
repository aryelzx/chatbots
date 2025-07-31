import type { RouteObject } from "react-router-dom";
import { ChatsPage } from "../pages";
import { HistoricoChatsPage } from "../submodules/historico/pages";
import { authLoader } from "@/router/loader.routes";

const chatRoutes: RouteObject[] = [
	{
		path: "/chats",
		element: <ChatsPage />,
		loader: authLoader
	},
	{
		path: "/chats/historico",
		element: <HistoricoChatsPage />,
		loader: authLoader
	},
];

export { chatRoutes };
