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
import { useConversationService } from "../../services/conversation.service";
import type { messageInputDto } from "../../dtos/conversation";
import { useState } from "react";
import { useChatContext } from "../../context/useChatContext";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { errorHandler } from "@/shared/api/errorHandler";

function WellcomeComponent() {
	const navigate = useNavigate();
	const [inputText, setInputText] = useState<string>("");
	const { currentChat, messagesByChat } = useChatContext();
	const { user } = useUserContext();

	function handleRedirectToCreateChat(path: string) {
		navigate(path);
	}

	async function handleSendMessage() {
		try {
			if (!inputText.trim()) return;
			const params: messageInputDto = {
				prompt_input_text: inputText,
				tipo: "P", //pergunta
				send_by: "U",
				user_id: user.value.id,
				context: currentChat.value?.context,
				created_by: user.value.id,
			};
			const { response } = await useConversationService.sendMessage(
				2,
				params
			);
			console.log("message do response ==>", response);
			const newMessages = [
				...messagesByChat.get.filter(
					(message) => message.chat_id !== response.chat_id
				),
				{
					id: response.id,
					prompt_input_text: response.prompt_input_text,
					tipo: response.tipo,
					send_by: "U",
					user_id: response.user_id,
					context: response.context,
					created_by: response.created_by,
					created_at: response.created_at,
					chat_id: response.chat_id,
					mensagem: inputText,
				},
				{
					id: response.id,
					prompt_input_text: response.prompt_input_text,
					tipo: response.tipo,
					send_by: response.send_by,
					user_id: response.user_id,
					context: response.context,
					created_by: response.created_by,
					created_at: response.created_at,
					chat_id: response.chat_id,
					mensagem: response.mensagem,
				},
			];
			messagesByChat.set(newMessages);
			user.set((prev) => ({
				...prev,
				hasChat: true,
			}));
			setInputText("");
			// console.log("Message sent successfully:", message);
		} catch (error) {
			errorHandler(error, "WellcomeComponent.handleSendMessage");
			console.error("Error sending message:", error);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-[80vh] relative">
			<div className="flex gap-2">
				<span className="animate-pulse">
					<BotMessageSquare color="blue" size={30} />
				</span>
				<h2 className="text-2xl font-semibold">Bem-vindo ao Chat!</h2>
			</div>
			<Card className="w-2/3 mt-4">
				<CardContent>
					<Input
						placeholder="Pergunte qualquer coisa"
						className="border-none focus:border-none h-13"
						onChange={(e) => setInputText(e.target.value)}
						value={inputText}
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
							onClick={handleSendMessage}
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
