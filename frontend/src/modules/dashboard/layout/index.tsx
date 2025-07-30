import { Layout, type SidebarButton } from "@/shared/components/layout";
import { dashboardModules } from "../mocks/dashboardModules";

export type Children = {
    children: React.ReactNode;
};

const DashBoardLayout = ({ children }: Children) => {
    const { modules } = dashboardModules();

    const sidebarButton: SidebarButton[] = modules.map((item) => ({
        icon: item.icon,
        label: item.title,
        path: item.path,
        disabled: item.disabled,
    }));

    return <Layout sidebarButtons={sidebarButton}>{children}</Layout>;
};

export { DashBoardLayout };
