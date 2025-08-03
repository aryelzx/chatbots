import { Layout, type SidebarButton } from "@/shared/components/layout";
import { Users } from "lucide-react";

export type Children = {
    children: React.ReactNode;
};

const UsersLayout = ({ children }: Children) => {

    const asideButtons: SidebarButton[] = [
		{
			icon: <Users />,
			label: "Usuários",
			path: "/usuarios",
		}
	];


    return <Layout sidebarButtons={asideButtons}>{children}</Layout>;
};

export { UsersLayout };
