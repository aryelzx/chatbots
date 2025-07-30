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

import { useState } from "react";
import { useChatContext } from "../../context/useChatContext";

import { LoaderComponent } from "@/shared/components/loader";
import { ChatInfoDialog } from "../Conversation/chatDialog";

function WellcomeComponent() {
	const navigate = useNavigate();
	const [inputText, setInputText] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const { handleSendMessage } = useChatContext();

	function handleRedirectToCreateChat(path: string) {
		navigate(path);
	}

	async function handleSend() {
		try {
			setLoading(true);
			await handleSendMessage(inputText);
			setInputText("");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-[80vh] relative">
			{loading ? (
				<>
					<LoaderComponent message="Gerando uma nova conversa..." variant="blue" />
				</>
			) : (
				<>
					<div className="flex gap-2">
						<span className="animate-pulse">
							<BotMessageSquare color="blue" size={30} />
						</span>
						<h2 className="text-2xl font-semibold">
							Bem-vindo ao Chat!
						</h2>
					</div>
					<Card className="w-2/3 mt-4">
						<CardContent>
							<Input
								placeholder="Pergunte qualquer coisa"
								className="border-none focus:border-none h-13"
								onChange={(e) => setInputText(e.target.value)}
								value={inputText}
								disabled={loading}
								onKeyDown={(e) => {
									if (
										e.key === "Enter" &&
										!loading &&
										inputText.trim()
									) {
										handleSend();
									}
								}}
							/>
							<div className="flex items-center max-w-6xl mx-auto mt-4 justify-between">
								<div className="gap-2 flex items-center">
									<ChatInfoDialog />
									<button
										className="text-zinc-400 hover:text-zinc-500 transition-colors cursor-pointer"
										onClick={() => navigate(-1)}
										disabled={loading}
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
										disabled={loading}
									>
										<GalleryHorizontalEnd />
									</button>
									<button
										className="text-zinc-400 hover:text-zinc-500 transition-colors cursor-pointer"
										onClick={() =>
											handleRedirectToCreateChat(
												"/chats/create"
											)
										}
										disabled={loading}
									>
										<Plus />
									</button>
								</div>
								<button
									onClick={() => handleSend()}
									className="p-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={loading || !inputText.trim()}
								>
									<Send size={20} color="white" />
								</button>
							</div>
						</CardContent>
					</Card>
				</>
			)}
		</div>
	);
}

export { WellcomeComponent };
