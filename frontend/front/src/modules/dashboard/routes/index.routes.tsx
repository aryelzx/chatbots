import type { RouteObject } from "react-router-dom";
import { DashBoard } from "../pages";

const dashboardRoutes: RouteObject[] = [
	{
		path: "/dashboard",
		element: <DashBoard />,
		// loader: authLoader
	},
];

export { dashboardRoutes };
