import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useCreateChatHook } from "../hooks/useCreateChat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Robo from "@/assets/robo.png";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Bot, Undo2 } from "lucide-react";
import { ChatsLayout } from "@/modules/chats/layout";
import { useNavigate } from "react-router-dom";

function CreateChatPage() {
	const { form, handleCreateChat } = useCreateChatHook();
	const navigate = useNavigate();
	function handleGoBack() {	
		navigate(-1); // Navigate back to the previous page
	}
	return (
		<ChatsLayout>
			<div className="max-w-4xl w-2xl mx-auto mt-10 p-8 border rounded-2xl shadow-lg bg-white relative">
				<img
					src={Robo}
					alt="Robo"
					className="absolute top-4 right-4 w-16 h-16 opacity-80 animate-pulse hover:animate-none transition-all duration-300"
					style={{ filter: "blur(0px)" }}
				/>
				<div className="flex  items-center mb-8 gap-2">
					<button onClick={handleGoBack} className="px-2 py-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors">
						<Undo2 color="gray" size={15} />
					</button>
					<h1 className="text-2xl font-semibold text-center">
						Criar Novo Chat
					</h1>
					<span className="text-blue-500 opacity-70">
						<Bot size={20} />
					</span>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateChat)}
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
					>
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											className="h-10 max-w-md border-1 focus:ring-2 focus:ring-blue-500"
											placeholder="Ex: Chat de JavaScript"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Nome do seu chat.
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
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Input
											className="h-10 max-w-md border-1 focus:ring-2 focus:ring-blue-500"
											placeholder="Descrição da conversa"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Propósito da conversa.
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
									<FormLabel>Contexto</FormLabel>
									<FormControl>
										<Input
											className="h-10 max-w-md border-1 focus:ring-2 focus:ring-blue-500"
											placeholder="Informações adicionais"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Ajuda a IA a entender melhor.
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
									<FormLabel>Modelo</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione um modelo" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="gpt-3.5-turbo">
												GPT-3.5 Turbo
											</SelectItem>
											<SelectItem value="gpt-4">
												GPT-4
											</SelectItem>
											<SelectItem value="gpt-4o">
												GPT-4o
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Modelo de IA utilizado.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="md:col-span-2">
							<Button type="submit" className="w-full mt-4">
								Criar Chat
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</ChatsLayout>
	);
}

export { CreateChatPage };
