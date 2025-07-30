import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { errorHandler } from "@/shared/api/errorHandler";
import { LoaderComponent } from "@/shared/components/loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { RegisterInputDto } from "../../dtos/login";
import {
	registerUserSchema,
	type registerUserSchemaType,
} from "../../schemas/register";
import { useAuthService } from "../../services/login.service";

type Props = {
	callBack: (tabs: string, cpf: string) => void;
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
			const handleParams: RegisterInputDto = {
				email: data.email,
				nome: data.nome,
				cpf: data.cpf.split(".").join("").replace("-", ""),
				senha: data.senha,
				role: data.role,
			}
			await useAuthService.register(handleParams);
			toast.success("Usuário cadastrado com sucesso!");
			callBack("login", data.cpf);
			form.reset();
		} catch (error) {
			console.error("Error registering user:", error);
			errorHandler(error, "Erro ao cadastrar usuário");
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
					className="flex flex-col gap-6"
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
										className="h-11 rounded-md border border-gray-400"
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
										className="h-11 rounded-md border border-gray-400"
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
										className="h-11 rounded-md border border-gray-400"
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
											className="h-11 rounded-md pr-10 border border-gray-400"
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
							className="w-full h-11 cursor-pointer bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
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
