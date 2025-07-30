import Robo from "@/assets/robo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { RegisterUserFormComponent } from "../components/registerForm";
import type { LoginInputDto } from "../dtos/login";
import { UseLoginHook } from "../hooks/useLogin";

function LoginPage() {
	const { handleLogin, form } = UseLoginHook();
	const [tabsValue, setTabsValue] = useState("login");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = form.handleSubmit((data: LoginInputDto) => {
		handleLogin(data);
	});

	function handleTabsChange(tabs: string, cpf: string) {
		setTabsValue(tabs);
		if (tabs === "login") {
			form.setValue("cpf", cpf);
		}
	}

	return (
		<div className="min-h-screen bg-primary bg-cover bg-center flex items-center justify-center p-4">
			<Card className="relative w-full max-w-lg max-h-[80vh] bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl">
				<img
					src={Robo}
					alt="Robo"
					className="absolute w-44 top-[-10%] left-[-15%] h-auto select-none pointer-events-none"
					draggable={false}
				/>

				<CardContent className="flex flex-col gap-6 h-full px-8 py-10">
					<h1 className="text-4xl font-extrabold text-center text-primary mb-8 select-none">
						Bem vindo!
					</h1>

					<Tabs
						value={tabsValue}
						onValueChange={(e) => handleTabsChange(e, form.watch("cpf"))}
						defaultValue="login"
						className="flex flex-col"
					>
						<TabsList className="grid grid-cols-2 rounded-xl bg-muted p-1 mb-8 shadow-inner">
							<TabsTrigger
								value="login"
								className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition"
							>
								Login
							</TabsTrigger>
							<TabsTrigger
								value="cadastro"
								className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition"
							>
								Cadastro
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value="login"
							className="flex flex-col items-center"
						>
							<Form {...form}>
								<form
									onSubmit={handleSubmit}
									className="w-full max-w-sm flex flex-col gap-5"
									noValidate
								>
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
														{form.watch(
															"senha"
														) && (
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
									<Button
										type="submit"
										className="mt-4 h-11 w-full bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer"
									>
										Entrar
									</Button>
								</form>
							</Form>
						</TabsContent>

						<TabsContent
							value="cadastro"
							className="w-full max-w-lg mx-auto"
						>
							<RegisterUserFormComponent
								callBack={(tabs, cpf) => handleTabsChange(tabs, cpf)}
							/>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}

export { LoginPage };
