import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Backpack,
	Bot,
	CircleEllipsis,
	GalleryHorizontalEnd,
	Info,
	Leaf,
	MoveLeft,
	Plus,
	Send,
	Undo2,
} from "lucide-react";
import type { messageType } from "../../dtos/conversation";
import { useChatContext } from "../../context/useChatContext";
import dayjs from "dayjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChatInfoDialog } from "./chatDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@/components/ui/tooltip";

type Props = {
	messages: messageType[];
};

function ChatMessagesComponent({ messages }: Props) {
	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);
	const { currentChat } = useChatContext();
	const navigate = useNavigate();
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="flex flex-col h-full bg-zinc-900 text-white border-zinc-800 rounded-lg">
			<header className="px-6 py-4 border-b border-zinc-800 text-lg font-semibold flex items-center justify-between">
				<div className="text-secondary mr-2 flex items-center gap-2">
					<Bot />
					<p className="text-sm">{currentChat.value.modelo}</p>
				</div>
				<div>
					<ChatInfoDialog currentChat={currentChat} />
				</div>
			</header>
			<ScrollArea className="flex-1 px-6 py-4 h-[70vh] overflow-y-auto">
				<div className="flex flex-col space-y-3">
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={`flex ${
								msg.send_by === "U"
									? "justify-end"
									: "justify-start"
							}`}
						>
							<>
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
												{dayjs(msg.created_at).format(
													"HH:mm - DD/MM/YY"
												)}
											</span>
										</div>
									) : null}
									{msg.mensagem}
									{msg.send_by === "U" && (
										<span className="text-xs text-zinc-400 block mt-1">
											{dayjs(msg.created_at).format(
												"HH:mm - DD/MM/YY"
											)}
										</span>
									)}
								</div>
							</>
						</div>
					))}
					<div ref={bottomRef} />
				</div>
			</ScrollArea>

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
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							// if (e.key === "Enter") handleSend();
						}}
					/>
					<button
						// onClick={handleSend}
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
