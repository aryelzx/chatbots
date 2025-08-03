import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Bot, GalleryHorizontalEnd, Plus, Send, Undo2 } from "lucide-react";
import { useChatContext } from "../../context/useChatContext";
import dayjs from "dayjs";
import { ChatInfoDialog } from "./chatDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { LoaderComponent } from "@/shared/components/loader";
import { motion, AnimatePresence } from "framer-motion";

function ChatMessagesComponent() {
	const [inputText, setInputText] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);
	const { currentChat, messagesByChat, loadingMessages, handleSendMessage } =
		useChatContext();
	const navigate = useNavigate();

	function handleSend() {
		if (inputText.trim()) {
			handleSendMessage(inputText);
			setInputText("");
		}
	}

	useEffect(() => {
		if (messagesByChat.get.length > 0) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messagesByChat.get]);

	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messagesByChat.get]);

	return (
		<div className="flex flex-col h-full bg-zinc-900 text-white border-zinc-800 rounded-lg">
			<header className="px-6 py-4 border-b border-zinc-800 text-lg font-semibold flex items-center justify-between">
				<div className="text-secondary mr-2 flex items-center gap-2">
					<Bot />
					<p className="text-sm">{currentChat.value.modelo}</p>
				</div>
				<div>
					<ChatInfoDialog />
				</div>
			</header>
			{loadingMessages.value ? (
				<div className="flex items-center justify-center h-full">
					<LoaderComponent
						message="Carregando mensagens..."
						variant="white"
					/>
				</div>
			) : (
				<ScrollArea className="flex-1 px-6 py-4 h-[70vh] overflow-y-auto">
					<div className="flex flex-col space-y-3">
						<AnimatePresence>
							{messagesByChat.get.map((msg) => (
								<motion.div
									key={msg.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.2 }}
									className={`flex ${
										msg.send_by === "U"
											? "justify-end"
											: "justify-start"
									}`}
								>
									<div
										className={`max-w-3xl px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
											msg.send_by === "U"
												? "bg-zinc-600 text-white rounded-br-none"
												: "bg-zinc-800 text-gray-100 rounded-bl-none"
										}`}
									>
										{msg.send_by === "B" ? (
											<div className="flex items-center gap-2">
												<Bot
													size={20}
													className="text-blue-500"
												/>
												<span className="text-xs text-zinc-400">
													{dayjs(
														msg.created_at
													).format(
														"HH:mm - DD/MM/YY"
													)}
												</span>
											</div>
										) : null}
										{msg.mensagem ===
										"Carregando resposta..." ? (
											<span className="animate-pulse">
												Carregando...
											</span>
										) : (
											msg.mensagem
										)}
										{msg.send_by === "U" && (
											<span className="text-xs text-zinc-400 block mt-1">
												{dayjs(msg.created_at).format(
													"HH:mm - DD/MM/YY"
												)}
											</span>
										)}
									</div>
								</motion.div>
							))}
						</AnimatePresence>
						<div ref={bottomRef} />
					</div>
				</ScrollArea>
			)}

			<footer className="border-t border-zinc-800 p-4">
				<div className="flex items-center gap-2 max-w-6xl mx-auto">
					<button
						className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
						onClick={() => navigate(-1)}
					>
						<Undo2 />
					</button>
					<button
						className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
						onClick={() => navigate("/chats/historico")}
					>
						<GalleryHorizontalEnd />
					</button>
					<button
						className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
						onClick={() => navigate("/chats/create")}
					>
						<Plus />
					</button>
					<Input
						className="flex-1 h-12 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
						placeholder="Digite sua mensagem..."
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSend();
						}}
					/>
					<button
						onClick={handleSend}
						className="p-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors cursor-pointer"
					>
						<Send size={20} color="white" />
					</button>
				</div>
			</footer>
		</div>
	);
}

export { ChatMessagesComponent };
