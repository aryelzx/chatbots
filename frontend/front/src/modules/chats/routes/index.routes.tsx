import type { RouteObject } from "react-router-dom";
import { ChatsPage } from "../pages";
import { HistoricoChatsPage } from "../submodules/historico/pages";
import { authLoader } from "@/router/loader.routes";
import { ChatContextProvider } from "../context/chatContext";

const chatRoutes: RouteObject[] = [
	{
		path: "/chats",
		element: (
			<ChatContextProvider>
				<ChatsPage />
			</ChatContextProvider>
		),
		loader: authLoader,
	},
	{
		path: "/chats/historico",
		element: <HistoricoChatsPage />,
		loader: authLoader,
	},
];

export { chatRoutes };
