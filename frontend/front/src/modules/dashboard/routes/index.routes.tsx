import type { RouteObject } from "react-router-dom";
import { DashBoard } from "../pages";
import { authLoader } from "@/router/loader.routes";

const dashboardRoutes: RouteObject[] = [
	{
		path: "/dashboard",
		element: <DashBoard />,
		loader: authLoader
	},
];

export { dashboardRoutes };
