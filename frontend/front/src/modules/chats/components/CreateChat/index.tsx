import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useCreateChatHook } from "./hooks/useCreateChat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CreateChatComponent() {
	const { form, handleCreateChat } = useCreateChatHook();
	return (
		<div>
			<h1>Criar nova conversa</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCreateChat)}
				>
					<FormField
						control={form.control}
						name="nome"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
								<FormDescription>
									Este é o seu nome de exibição público.
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
										placeholder="Descrição da conversa"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Descreva brevemente o propósito desta
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
								<FormLabel>Contexto</FormLabel>
								<FormControl>
									<Input
										placeholder="Contexto da conversa"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Forneça informações adicionais relevantes
									para a conversa.
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
								<FormControl>
									<Input
										placeholder="Modelo de IA"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Selecione o modelo de IA a ser utilizado.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="mt-4">
						Criar Chat
					</Button>
				</form>
			</Form>
		</div>
	);
}

export { CreateChatComponent };
