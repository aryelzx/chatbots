
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { JSX } from "react";
import { PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export type Props = {
    icon: JSX.Element;
    title: string;
    description: string;
    path: string;
    disabled?: boolean;
};

const ModuleCard = ({
    icon,
    title,
    description,
    path,
    disabled,
}: Props) => {
    const navigate = useNavigate();
    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:scale-[101%] hover:shadow-lg flex flex-col justify-between p-6",
                disabled && "opacity-50 cursor-not-allowed hidden"
            )}
            onClick={() => {
                if (!disabled) navigate(path);
            }}
        >
            <CardHeader>
                <div className="flex items-center justify-between relative">
                    <CardTitle className="flex items-center justify-start gap-2">
                        {icon}
                        {title}
                    </CardTitle>
                    <PiArrowRight className="w-8 h-8 text-zinc-800 absolute right-0 top-2" />
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export { ModuleCard };

