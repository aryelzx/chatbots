import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type Message = {
	id: string;
	text: string;
	from: "user" | "bot";
};

const mockMessages: Message[] = [
	{ id: "1", text: "Olá, como posso te ajudar hoje?", from: "bot" },
	{ id: "2", text: "Quero saber mais sobre investimentos.", from: "user" },
	{ id: "3", text: "Claro! Podemos falar sobre renda fixa, variável...", from: "bot" },
];

function ChatMessagesComponent() {
	const [messages, setMessages] = useState<Message[]>(mockMessages);
	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = () => {
		if (input.trim() === "") return;
		setMessages((prev) => [
			...prev,
			{ id: crypto.randomUUID(), text: input, from: "user" },
		]);
		setInput("");
	};

	return (
		<div className="flex flex-col h-screen bg-zinc-900 text-white">
			<header className="px-6 py-4 border-b border-zinc-800 text-lg font-semibold">
				Chatbot
			</header>

			<main className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.from === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`max-w-3xl px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
								msg.from === "user"
									? "bg-blue-600 text-white rounded-br-none"
									: "bg-zinc-800 text-gray-100 rounded-bl-none"
							}`}
						>
							{msg.text}
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
							if (e.key === "Enter") handleSend();
						}}
					/>
					<button
						onClick={handleSend}
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
