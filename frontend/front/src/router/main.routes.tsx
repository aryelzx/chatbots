import { chatRoutes } from "@/modules/chats/routes/index.routes";
import { dashboardRoutes } from "@/modules/dashboard/routes/index.routes";
import { loginRoutes } from "@/modules/login/routes/index.routes";
import { usersRoutes } from "@/modules/usuarios/routes/index.routes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    ...chatRoutes,
    ...dashboardRoutes,
    ...loginRoutes,
    ...usersRoutes
]);

export { router };
