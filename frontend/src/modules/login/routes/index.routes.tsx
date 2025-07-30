
import type { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages";

const loginRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LoginPage />,
    },
];

export { loginRoutes };
