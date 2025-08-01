import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	BotMessageSquare,
	Paperclip,
	PlusCircle,
	Send,
	Undo2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function WellcomeComponent() {
	const navigate = useNavigate();
	function handleRedirectToCreateChat() {
		navigate("/chats/create");
	}
	return (
		<div className="flex flex-col items-center justify-center h-[80vh]">
			<div className="flex gap-2">
				<span>
					<BotMessageSquare color="blue" size={30} />
				</span>
				<h2 className="text-2xl font-semibold">Bem-vindo ao Chat!</h2>
			</div>
			<Card className="w-2/3 mt-4">
				<CardContent>
					<Input
						placeholder="Pergunte qualquer coisa"
						className="border-none focus:border-none h-13"
					/>
					<div className="mt-8 flex justify-between">
						<div className="flex  gap-2">
							<button className="px-2 py-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors">
								<Undo2 color="gray" />
							</button>
							<button className="px-2 py-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors">
								<Paperclip color="gray" />
							</button>
							<button
								onClick={handleRedirectToCreateChat}
								className="px-2 py-2 rounded-full bg-zinc-100 hover:bg-zinc-300 transition-colors"
							>
								<PlusCircle color="gray" />
							</button>
						</div>
						<div>
							<button className="px-2 py-2 rounded-full bg-zinc-100 hover:bg-zinc-300 transition-colors">
								<Send color="gray" />
							</button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export { WellcomeComponent };
