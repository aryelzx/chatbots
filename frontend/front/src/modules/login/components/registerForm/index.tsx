import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	registerUserSchema,
	type registerUserSchemaType,
} from "../../schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthService } from "../../services/login.service";
import { errorHandler } from "@/shared/api/errorHandler";
import { useState } from "react";
import { LoaderComponent } from "@/shared/components/loader";
import toast from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";

type Props = {
	callBack: (value: string) => void;
};

function RegisterUserFormComponent({ callBack }: Props) {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<registerUserSchemaType>({
		resolver: zodResolver(registerUserSchema),
		defaultValues: {
			role: "A", //  only admin user
			email: "",
			nome: "",
			cpf: "",
			senha: "",
		},
	});

	async function onSubmit(data: registerUserSchemaType) {
		try {
			setLoading(true);
			await useAuthService.register(data);
			toast.success("Usuário cadastrado com sucesso!");
			form.reset();
			callBack("login");
		} catch (error) {
			console.error("Error registering user:", error);
			errorHandler(error, "Erro ao cadastrar usuário");
			// Handle error appropriately, e.g., show a notification
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			{loading ? (
				<div className="flex items-center justify-center">
					<LoaderComponent
						message="Cadastrando usuário..."
						variant="blue"
					/>
				</div>
			) : (
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
					noValidate
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite o email"
										{...field}
										className="h-11 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="nome"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite o nome"
										{...field}
										className="h-11 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="cpf"
						render={({ field }) => (
							<FormItem>
								<FormLabel>CPF</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite o CPF"
										{...field}
										className="h-11 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="senha"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<div className="relative w-full">
										<Input
											type={
												showPassword
													? "text"
													: "password"
											}
											placeholder="Digite a senha"
											{...field}
											className="h-11 rounded-md pr-10"
										/>
										{form.watch("senha") && (
											<button
												type="button"
												onClick={() =>
													setShowPassword(
														!showPassword
													)
												}
												className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
												aria-label={
													showPassword
														? "Esconder senha"
														: "Mostrar senha"
												}
											>
												{showPassword ? (
													<EyeClosed />
												) : (
													<Eye />
												)}
											</button>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="md:col-span-2 flex justify-center">
						<Button
							type="submit"
							className="w-2/3 h-11 cursor-pointer bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
						>
							Cadastrar
						</Button>
					</div>
				</form>
			)}
		</Form>
	);
}

export { RegisterUserFormComponent };
