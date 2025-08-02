import { useChatContext } from "@/modules/chats/context/useChatContext";
import { ChatsLayout } from "@/modules/chats/layout";
import { useEffect, useState } from "react";
import { useGetAllChatsService } from "../services/getAllChats.service";
import type { GetAllChatsInputDto } from "../dtos/getAllChats";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { LoaderComponent } from "@/shared/components/loader";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import {
	createChatSchema,
	type CreateChatSchemaType,
} from "../../create/schemas/createChat";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IChat } from "@/modules/chats/interfaces/chat.interface";

function HistoricoChatsPage() {
	const { allChats } = useChatContext();
	const { user } = useUserContext();
	const [loading, setLoading] = useState(false);
	const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

	async function handleGetAllChats() {
		try {
			const param: GetAllChatsInputDto = {
				id_user: Number(user.value.id),
			};
			setLoading(true);
			const { chats } = await useGetAllChatsService.execute(param);
			allChats.set(chats);
		} catch (error) {
			console.error("Error fetching all chats:", error);
		} finally {
			setLoading(false);
		}
	}

	const form = useForm<CreateChatSchemaType>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			nome: "",
			descricao: "",
			context: "",
			modelo: "",
		},
	});

	function handleSetValuesInForm(chat: IChat) {
		setSelectedChat(chat);
		form.setValue("nome", chat.nome || "");
		form.setValue("descricao", chat.descricao || "");
		form.setValue("context", chat.context || "");
		form.setValue("modelo", chat.modelo || "");
	}

	useEffect(() => {
		handleGetAllChats();
	}, []);

	return (
		<ChatsLayout>
			<h1 className="text-2xl font-bold">Histórico de Chats</h1>
			{loading ? (
				<LoaderComponent
					variant="blue"
					message="Carregando os seus chats!"
				/>
			) : allChats.value.length > 0 ? (
				<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{allChats.value.map((chat) => (
						<Dialog
							key={chat.id}
							onOpenChange={(isOpen) => {
								if (isOpen) {
									handleSetValuesInForm(chat);
								}
							}}
						>
							<DialogTrigger asChild>
								<Card className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group">
									<CardContent className="p-5 flex items-start justify-between gap-4">
										<div>
											<h2 className="text-lg font-bold text-primary group-hover:underline">
												{chat.nome}
											</h2>
											<p className="text-sm text-muted-foreground mt-1 line-clamp-2">
												{chat.descricao}
											</p>
										</div>
										<MessageSquare
											className="text-muted-foreground mt-1"
											size={20}
										/>
									</CardContent>
								</Card>
							</DialogTrigger>
							<DialogContent className="max-w-2xl">
								<DialogHeader>
									<DialogTitle>{chat.nome}</DialogTitle>
									<DialogDescription>
										{chat.descricao}
									</DialogDescription>
								</DialogHeader>
								<form className="space-y-4 mt-4">
									<div>
										<label className="block text-sm font-medium">
											Nome
										</label>
										<input
											{...form.register("nome")}
											className="w-full border rounded px-3 py-2 mt-1"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">
											Descrição
										</label>
										<input
											{...form.register("descricao")}
											className="w-full border rounded px-3 py-2 mt-1"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">
											Contexto
										</label>
										<textarea
											{...form.register("context")}
											className="w-full border rounded px-3 py-2 mt-1"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">
											Modelo
										</label>
										<input
											{...form.register("modelo")}
											className="w-full border rounded px-3 py-2 mt-1"
										/>
									</div>
									<button
										type="submit"
										className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
									>
										Salvar
									</button>
								</form>
							</DialogContent>
						</Dialog>
					))}
				</div>
			) : (
				<p className="mt-4">Nenhum chat encontrado.</p>
			)}
		</ChatsLayout>
	);
}

export { HistoricoChatsPage };
