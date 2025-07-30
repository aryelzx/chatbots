import Logo from "@/assets/logo_simples.jpg";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { PiArrowRight, PiCaretLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import type { SidebarButton } from "../layout";

type Props = {
	children: React.ReactNode;
	buttons: SidebarButton[];
};

const SidebarDrawer = ({ children, buttons }: Props) => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const navigate = useNavigate();

	return (
		<div>
			<Sheet modal={true}>
				<SheetTrigger asChild>{children}</SheetTrigger>
				<SheetContent side="left" className="bg-primary text-white">
					<SheetHeader className="overflow-y-auto h-full overflow-x-hidden">
						<SheetTitle className="flex justify-center items-center">
							<img src={Logo} alt="Logo" className="w-36 mt-2 mb-5" />
						</SheetTitle>
						<div className="w-full flex justify-center items-center">
							<button
								onClick={() => navigate("/dashboard")}
								className={cn(
									"w-[95%] px-4 py-2 flex items-center justify-center rounded-full border-2 text-zinc-700 hover:bg-blue-950 hover:text-white cursor-pointer hover:-translate-y-1 focus:-translate-y-1 focus:text-white transition-all",
									window.location.pathname === "/dashboard" &&
									"bg-transparent border-none text-white"
								)}
							>
								<div className="flex items-center justify-center gap-2">
									<span className="text-3xl">
										<LuLayoutDashboard className="text-white" />
									</span>
									<span className="text-lg text-zinc-50">Abrir dashboard</span>
								</div>
							</button>
						</div>
						<SheetDescription className="flex flex-col justify-between h-full">
							<div className="space-y-4 py-4">
								{buttons.map(({ icon, label, path, disabled }) => (
									<button
										key={path}
										onClick={() => navigate(path)}
										className={cn(
											"w-[95%] px-4 py-2 flex items-center justify-between rounded-full text-white hover:bg-blue-950 hover:translate-x-2 cursor-pointer focus:translate-x-2 focus:scale-105 transition-all",
											window.location.pathname === path &&
											"bg-secondary",
											disabled && "hidden"
										)}
									>
										<div className="flex items-center justify-start gap-4">
											<span className="text-3xl">{icon}</span>
											<span className="text-lg">{label}</span>
										</div>
										<PiArrowRight className="text-lg" />
									</button>
								))}
								<button
									onClick={() => setIsOpenDialog(true)}
									className={cn(
										"w-[95%] px-4 py-2 flex items-center justify-between rounded-full text-white hover:bg-blue-950 hover:translate-x-2 focus:translate-x-2 focus:bg-tertiary transition-all"
									)}
								>
									<div className="flex items-center justify-start gap-4">
										<span className="text-3xl">
											<MdOutlineLogout size={24} />
										</span>
										<span className="text-lg ">Logout</span>
									</div>
									<PiArrowRight className=" text-lg" />
								</button>
							</div>
							{/* <div className="flex flex-col items-center">
								<p className="text-zinc-50 text-lg">{user.value}</p>
							</div> */}
						</SheetDescription>
						<SheetClose>
							<button
								className="absolute z-50 bottom-14 -right-1 -mr-4 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center group hover:bg-slate-200 transition-all"
							>
								<PiCaretLeftBold className="text-2xl text-black" />
							</button>
						</SheetClose>
					</SheetHeader>
				</SheetContent>
			</Sheet>
			{
				isOpenDialog && (
					<Dialog open={isOpenDialog} onOpenChange={() => setIsOpenDialog(!isOpenDialog)}>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>
									<div className="flex items-center py-2 gap-2">
										Alerta de Logout
									</div>
								</DialogTitle>
								<DialogDescription>
									Você confirma que deseja sair da aplicação?
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsOpenDialog(!isOpenDialog)}>
									Cancelar
								</Button>
								<Button onClick={() => setIsOpenDialog(!isOpenDialog)}>Confirmar</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)
			}
		</div>
	);
};

export { SidebarDrawer };
