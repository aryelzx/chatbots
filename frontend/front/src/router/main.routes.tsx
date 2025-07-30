import { dashboardRoutes } from "@/modules/dashboard/routes/index.routes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    ...dashboardRoutes
]);

export { router };
