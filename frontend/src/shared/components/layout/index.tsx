import Logo from "@/assets/robo.png";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type React from "react";
import type { JSX } from "react";
import { LuHouse } from "react-icons/lu";
import { PiCaretRightBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { SidebarDrawer } from "../sideBarDrawer";

export type Breadcrumb = {
    label: string;
    path: string;
};

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
    breadcrumbs?: Breadcrumb[];
}

function Layout({ children, sidebarButtons, defaultDisabled, breadcrumbs = [] }: Props): JSX.Element {
    const navigate = useNavigate();

    return (
        <main className="w-full h-screen flex">
            <aside className="w-[5%] flex flex-col items-center gap-6 relative bg-primary transition-all">
                <div className="w-full h-[10%] flex items-center justify-center">
                    <img src={Logo} alt="Logo" onClick={() => navigate("/dashboard")} className="w-10 mt-6 mb-5 hover:cursor-pointer" />
                </div>
                {sidebarButtons.map((item, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => navigate(item.path)}
                                disabled={item.disabled}
                                className={cn(
                                    "w-12 h-10 flex items-center justify-center rounded-full text-white hover:bg-blue-950 focus:bg-blue-950 transition-all cursor-pointer",
                                    window.location.pathname === item.path && "bg-blue-950",
                                    !defaultDisabled && item.disabled && "hidden",
                                    defaultDisabled && item.disabled
                                        ? "hover:bg-primary text-tertiary hover:text-tertiary"
                                        : "hover:bg-none"
                                )}
                            >
                                <p>{item.icon}</p>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <span className="text-white text-sm font-semibold">
                                {item.label}
                            </span>
                        </TooltipContent>
                    </Tooltip>
                ))}
                <SidebarDrawer buttons={sidebarButtons}>
                    <button className="absolute z-50 bottom-14 -right-1 -mr-4 bg-white w-10 h-10 rounded-full shadow-md shadow-gray-500 flex items-center justify-center group hover:bg-slate-200 transition-all">
                        <PiCaretRightBold className="text-2xl text-black" />
                    </button>
                </SidebarDrawer>
            </aside>
            <div className="w-[95%] bg-primary">
                <header className="w-full h-[10%] flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        {breadcrumbs.length === 0 && (
                            <Button
                                variant="link"
                                className="p-0 text-2xl font-semibold text-white disabled:opacity-100"
                                disabled={breadcrumbs.length === 0}
                                onClick={() => navigate("/dashboard")}
                            >
                                Dashboard
                            </Button>
                        )}
                        {breadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center">
                                {index > 0 && (
                                    <span className="text-white font-bold mr-3">
                                        {">"}
                                    </span>
                                )}
                                <Button
                                    variant="link"
                                    disabled={index === breadcrumbs.length - 1}
                                    className="p-0 text-2xl font-semibold text-white disabled:opacity-100"
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.label}
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-full flex justify-end items-center gap-2 p-1">
                        <Button
                            variant="outline"
                            className="w-10 h-10 rounded-full border-2 p-2 text-primary hover:bg-primary hover:text-white transition-all"
                            onClick={() => navigate("/dashboard")}
                        >
                            <LuHouse size={20} />
                        </Button>
                    </div>
                </header>
                <div className="flex max-w-[99%] min-h-[88%] max-h-[88%] bg-white rounded-3xl shadow-2xl p-4">
                    <ScrollArea className="w-full p-4">{children}</ScrollArea>
                </div>
            </div>
        </main>
    )

}

export { Layout };
