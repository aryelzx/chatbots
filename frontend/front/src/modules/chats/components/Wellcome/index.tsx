import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	BotMessageSquare,
	GalleryHorizontalEnd,
	Plus,
	Send,
	Undo2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function WellcomeComponent() {
	const navigate = useNavigate();

	function handleRedirectToCreateChat(path: string) {
		navigate(path);
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
					<div className="flex items-center max-w-6xl mx-auto mt-4 justify-between">
						<div className="gap-2 flex items-center">
							<button
								className="text-zinc-400 hover:text-zinc-500 transition-colors cursor-pointer"
								onClick={() => navigate(-1)}
							>
								<Undo2 />
							</button>
							<button
								className="text-zinc-400 hover:text-zinc-500 transition-colors cursor-pointer"
								onClick={() =>
									handleRedirectToCreateChat(
										"/chats/historico"
									)
								}
							>
								<GalleryHorizontalEnd />
							</button>
							<button
								className="text-zinc-400 hover:text-zinc-500 transition-colors cursor-pointer"
								onClick={() =>
									handleRedirectToCreateChat("/chats/create")
								}
							>
								<Plus />
							</button>
						</div>
						<button
							// onClick={handleSend}
							className="p-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors cursor-pointer"
						>
							<Send size={20} color="white" />
						</button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export { WellcomeComponent };
