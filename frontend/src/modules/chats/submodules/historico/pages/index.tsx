import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChatsLayout } from "@/modules/chats/layout";
import { LoaderComponent } from "@/shared/components/loader";
import dayjs from "dayjs";
import { MessageSquareShare } from "lucide-react";
import { ChatCardComponent } from "../components/chatCard";
import { useHistoricoHook } from "../hooks/useHistorico";

function HistoricoChatsPage() {
	const {
		allChats,
		handleRedirectToChat,
		handleModal,
		handleUpdateChat,
		loading,
		isModalOpen,
		form,
		selectedChat,
	} = useHistoricoHook();

	return (
		<ChatsLayout>
			<h1 className="text-2xl font-bold">Histórico de Chats</h1>
			<p className="text-muted-foreground mt-2">
				Aqui você pode visualizar e gerenciar seus chats anteriores clicando nele.
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
							<ChatCardComponent chat={chat} handleModal={(chat, isOpen) => handleModal(chat, isOpen)}
								handleRedirect={() => handleRedirectToChat(chat)}
							/>
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
													"DD/MM/YYYY HH:mm"
												)}
											</DialogDescription>
										</DialogHeader>
										<Form {...form}>
											<form
												onSubmit={form.handleSubmit(
													handleUpdateChat
												)}
												className="flex flex-col gap-6 mt-4"
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
																<Textarea
																	placeholder="Tell us a little bit about yourself"
																	className="resize-none"
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
														className="w-full bg-secondary cursor-pointer text-primary px-4 py-2 rounded mt-4 hover:bg-zinca-500 transition-colors duration-200 flex items-center justify-center gap-2"
														disabled={
															loading.selectedChat
														}
													>
														Ir para conversa
														<MessageSquareShare size={15} />
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
