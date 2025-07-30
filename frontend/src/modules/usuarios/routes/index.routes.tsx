import type { RouteObject } from "react-router-dom";
import { authLoader } from "@/router/loader.routes";
import { UsuariosPages } from "../pages";

const usersRoutes: RouteObject[] = [
	{
		path: "/usuarios",
		element: <UsuariosPages />,
		loader: authLoader
	},
];

export { usersRoutes };
