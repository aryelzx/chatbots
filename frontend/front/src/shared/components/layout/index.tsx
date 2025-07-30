import Logo from "@/assets/logo_simples.jpg";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type React from "react";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

export type SidebarButton = {
    icon: JSX.Element;
    label: string;
    path: string;
    disabled?: boolean;
};

type Props = {
    children: React.ReactNode;
    sidebarButtons: SidebarButton[];
    defaultDisabled?: boolean;
}

function Layout({ children, sidebarButtons, defaultDisabled }: Props): JSX.Element {
    const navigate = useNavigate();

    return (
        <main className="w-full h-screen flex">
            <aside className="w-[5%] flex flex-col items-center gap-6 relative bg-primary transition-all">
                <div className="w-full h-[10%] flex items-center justify-center">
                    <img src={Logo} alt="Logo" onClick={() => navigate("/dashboard")} className="w-10 mt-6 mb-5 hover:cursor-pointer" />
                </div>
                {sidebarButtons.map((item, index) => (
                    <Tooltip key={index}>
                        <Button
                            onClick={() => navigate(item.path)}
                            disabled={item.disabled}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-full text-white text-2xl hover:bg-[#f68f69] focus:bg-[#f68f69] transition-all",
                                window.location.pathname === item.path && "bg-secondary",
                                !defaultDisabled && item.disabled && "hidden",
                                defaultDisabled && item.disabled
                                    ? "hover:bg-primary text-tertiary hover:text-tertiary"
                                    : "hover:bg-none"
                            )}
                        >
                            <p>{item.icon}</p>
                        </Button>
                    </Tooltip>
                ))}
            </aside>
            <div className="flex max-w-[99%] min-h-[88%] max-h-[88%] bg-white rounded-3xl shadow-2xl p-4">
                <ScrollArea className="w-full p-4">{children}</ScrollArea>
            </div>
        </main>
    )

}

export { Layout };
