import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Bot, CircleEllipsis, Info, Send } from "lucide-react";
import type { messageType } from "../../dtos/conversation";
import { useChatContext } from "../../context/useChatContext";
import dayjs from "dayjs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ChatInfoDialog } from "./chatDialog";

type Props = {
	messages: messageType[];
};

function ChatMessagesComponent({ messages }: Props) {
	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);
	const { currentChat } = useChatContext();

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="flex flex-col h-full bg-zinc-900 text-white">
			<header className="px-6 py-4 border-b border-zinc-800 text-lg font-semibold flex items-center justify-between">
				<div className="text-secondary mr-2 flex items-center gap-2">
					<Bot />
					<p className="text-sm">{currentChat.value.modelo}</p>
				</div>
				<div>
					<ChatInfoDialog currentChat={currentChat} />
				</div>
			</header>

			<main className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.send_by === "U"
								? "justify-end"
								: "justify-start"
						}`}
					>
						<div
							className={`max-w-3xl px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
								msg.send_by === "U"
									? "bg-blue-600 text-white rounded-br-none"
									: "bg-zinc-800 text-gray-100 rounded-bl-none"
							}`}
						>
							{msg.mensagem}
						</div>
					</div>
				))}
				<div ref={bottomRef} />
			</main>

			<footer className="border-t border-zinc-800 p-4">
				<div className="flex items-center gap-2 max-w-5xl mx-auto">
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
						className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
					>
						<Send size={20} color="white" />
					</button>
				</div>
			</footer>
		</div>
	);
}

export { ChatMessagesComponent };
