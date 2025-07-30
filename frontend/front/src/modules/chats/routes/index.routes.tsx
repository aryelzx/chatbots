import { DashBoard } from "@/modules/dashboard/pages";
import { authLoader } from "@/router/loader.routes";
import type { RouteObject } from "react-router-dom";

const chatRoutes: RouteObject[] = [
	{
		path: "/chat",
		element: <DashBoard />,
		loader: authLoader
	},
];

export { chatRoutes };
