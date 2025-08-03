import { useChatContext } from "@/modules/chats/context/useChatContext";
import { ChatsLayout } from "@/modules/chats/layout";
import { useEffect, useRef, useState } from "react";
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
import { useUpdateChatService } from "../services/updateChat.service";
import type { UpdateChatInputDto } from "../dtos/updateChat";
import { errorHandler } from "@/shared/api/errorHandler";
import toast from "react-hot-toast";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

type LoadingStates = {
	allChats: boolean;
	selectedChat: boolean;
};

function HistoricoChatsPage() {
	const { allChats, currentChat, messagesByChat } = useChatContext();
	const { user } = useUserContext();
	const [loading, setLoading] = useState<LoadingStates>({
		allChats: false,
		selectedChat: false,
	});
	const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	async function handleGetAllChats() {
		try {
			allChats.set([]);
			const param: GetAllChatsInputDto = {
				id_user: Number(user.value.id),
			};
			setLoading((prev) => ({ ...prev, allChats: true }));
			const { chats } = await useGetAllChatsService.execute(param);
			allChats.set(chats);
		} catch (error) {
			console.error("Error fetching all chats:", error);
		} finally {
			setLoading((prev) => ({ ...prev, allChats: false }));
		}
	}

	const form = useForm<CreateChatSchemaType>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			nome: selectedChat?.nome || "",
			descricao: selectedChat?.descricao || "",
			context: selectedChat?.context || "",
			modelo: selectedChat?.modelo || "",
		},
	});

	function handleSetValuesInForm(chat: IChat) {
		setSelectedChat(chat);
		form.setValue("nome", chat.nome || "");
		form.setValue("descricao", chat.descricao || "");
		form.setValue("context", chat.context || "");
		form.setValue("modelo", chat.modelo || "");
	}

	async function handleUpdateChat(data: CreateChatSchemaType) {
		try {
			if (!selectedChat) return;
			if (!form.formState.isDirty) {
				setIsModalOpen(false);
				return;
			}
			setLoading((prev) => ({ ...prev, selectedChat: true }));
			const params: UpdateChatInputDto = {
				id_user: selectedChat.id.toString(),
				chat: {
					id: selectedChat.id,
					nome: data.nome,
					descricao: data.descricao,
					context: data.context,
					modelo: data.modelo,
					status: "A", // toggle para desativar chat
					user_id: Number(user.value.id),
					updated_by: Number(user.value.id),
				},
			};

			const updatedChat = await useUpdateChatService.execute(params);
			const findIndexOfChat = allChats.value.findIndex(
				(chat) => chat.id === selectedChat.id
			);
			if (findIndexOfChat !== -1) {
				allChats.value[findIndexOfChat] = updatedChat.chat;
			}
			setSelectedChat(null);
			form.reset();
			toast.success("Chat atualizado com sucesso!");
		} catch (error) {
			errorHandler(error, "Erro ao atualizar o chat");
		} finally {
			setLoading((prev) => ({ ...prev, selectedChat: false }));
		}
	}

	function handleModal(chat: IChat, isOpen: boolean) {
		setIsModalOpen(isOpen);
		if (isOpen) {
			handleSetValuesInForm(chat);
		}
	}

	function handleRedirectToChat(chat: IChat) {
		currentChat.set(chat);
		localStorage.setItem("@chatbots_chat", JSON.stringify(chat));
		messagesByChat.set([]);
		setSelectedChat(chat);
		handleSetValuesInForm(chat);
		navigate(`/chats`);
	}

	useEffect(() => {
		handleGetAllChats();
	}, []);

	useEffect(() => {
		if (selectedChat) {
			form.reset({
				nome: selectedChat.nome,
				descricao: selectedChat.descricao,
				context: selectedChat.context,
				modelo: selectedChat.modelo,
			});
		}
	}, [selectedChat]);

	return (
		<ChatsLayout>
			<h1 className="text-2xl font-bold">Histórico de Chats</h1>
			<p className="text-muted-foreground mt-2">
				Aqui você pode visualizar e gerenciar seus chats anteriores.
			</p>
			{loading.allChats ? (
				<div className="flex items-center justify-center h-40 w-full">
					<LoaderComponent
						variant="blue"
						message="Carregando os seus chats!"
					/>
				</div>
			) : allChats.value.length > 0 ? (
				<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{allChats.value.map((chat) => (
						<Dialog
							key={chat.id}
							open={isModalOpen && selectedChat?.id === chat.id}
							onOpenChange={(e) => handleModal(chat, e)}
						>
							<DialogTrigger asChild>
								<Card className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group rounded-2xl border border-muted bg-zinc-800">
									<CardContent className="p-6 flex flex-col gap-3">
										<div className="flex items-start justify-between">
											<div className="flex-1 ">
												<h2 className="text-xl text-secondary font-semibold group-hover:underline truncate">
													{chat.nome}
												</h2>
												<p className="text-sm text-white/50 mt-1 line-clamp-2">
													{chat.descricao}
												</p>
											</div>
											<MessageSquare
												className="shrink-0 text-white"
												size={20}
											/>
										</div>

										<p className="text-xs text-white/50 mt-2">
											Criado em:{" "}
											{dayjs(chat.created_at).format(
												"DD [do] MM [de] YYYY [às] HH:mm"
											)}
										</p>
									</CardContent>
								</Card>
							</DialogTrigger>
							<DialogContent className="max-w-2xl">
								{loading.selectedChat ? (
									<div className="flex items-center justify-center h-40 w-full">
										<LoaderComponent
											variant="blue"
											message="Atualizando chat..."
										/>
									</div>
								) : (
									<>
										<DialogHeader>
											<DialogTitle>
												{chat.nome}
											</DialogTitle>
											<DialogDescription>
												🕐 criado:{" "}
												{dayjs(chat.created_at).format(
													"DD [do] MM [de] YYYY [às] HH:mm"
												)}
											</DialogDescription>
										</DialogHeader>
										<Form {...form}>
											<form
												onSubmit={form.handleSubmit(
													handleUpdateChat
												)}
												className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
											>
												<FormField
													control={form.control}
													name="nome"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Nome
															</FormLabel>
															<FormControl>
																<Input
																	className="h-10 max-w-md border-1 focus:ring-2 focus:ring-blue-500"
																	placeholder="Ex: Chat de JavaScript"
																	{...field}
																/>
															</FormControl>
															<FormDescription>
																Nome do seu
																chat.
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="descricao"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Descrição
															</FormLabel>
															<FormControl>
																<Input
																	className="h-10 max-w-md border-1 focus:ring-2 focus:ring-blue-500"
																	placeholder="Descrição da conversa"
																	{...field}
																/>
															</FormControl>
															<FormDescription>
																Propósito da
																conversa.
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="context"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Contexto
															</FormLabel>
															<FormControl>
																<Input
																	className="h-10 max-w-md border-1 focus:ring-2 focus:ring-blue-500"
																	placeholder="Informações adicionais"
																	{...field}
																/>
															</FormControl>
															<FormDescription>
																Ajuda a IA a
																entender melhor.
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="modelo"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Modelo
															</FormLabel>
															<Select
																onValueChange={
																	field.onChange
																}
																defaultValue={
																	field.value
																}
															>
																<FormControl>
																	<SelectTrigger className="h-10 max-w-md border-1 focus:ring-2 focus:ring-blue-500">
																		<SelectValue placeholder="Selecione um modelo" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="mistralai/mistral-7b-instruct:free">
																		Mistralai/mistral
																	</SelectItem>
																	<SelectItem value="moonshotai/kimi-k2:free">
																		Moonshotai
																	</SelectItem>
																	<SelectItem value="qwen/qwen3-coder:free">
																		Qwen/Qwen3
																		Coder
																	</SelectItem>
																</SelectContent>
															</Select>
															<FormDescription>
																Modelo de IA
																utilizado.
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>

												<div className="md:col-span-2 flex gap-2">
													<button
														type="button"
														onClick={() =>
															handleRedirectToChat(
																chat
															)
														}
														className="w-full bg-secondary  cursor-pointer text-primary px-4 py-2 rounded mt-4 hover:bg-zinca-500 transition-colors duration-200"
														disabled={
															loading.selectedChat
														}
													>
														Ir para conversa
													</button>
													<button
														type="submit"
														className="w-full bg-primary cursor-pointer  text-white px-4 py-2 rounded hover:bg-primary/90 mt-4"
														disabled={
															loading.selectedChat
														}
													>
														Salvar
													</button>
												</div>
											</form>
										</Form>
									</>
								)}
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
