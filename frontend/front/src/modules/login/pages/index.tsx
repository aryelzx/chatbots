import Robo from "@/assets/robo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseLoginHook } from "../hooks/useLogin";
import type { LoginInputDto } from "../dtos/login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterUserFormComponent } from "../components/registerForm";
import { useState } from "react";

function LoginPage() {
	const { handleLogin } = UseLoginHook();
	const [tabsValue, setTabsValue] = useState("login");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const params: LoginInputDto = {
			cpf: (event.target as HTMLFormElement).cpf.value,
			senha: (event.target as HTMLFormElement).password.value,
		};
		return await handleLogin(params);
	};

	function handleTabsChange(value: string) {
		setTabsValue(value);
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
						onValueChange={handleTabsChange}
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
							<form
								onSubmit={handleSubmit}
								className="w-full max-w-sm flex flex-col gap-5"
								noValidate
							>
								<div className="flex flex-col gap-1">
									<Label
										htmlFor="cpf"
										className="font-semibold text-sm"
									>
										CPF
									</Label>
									<Input
										id="cpf"
										type="text"
										placeholder="Digite seu CPF"
										className="h-11 rounded-md border border-muted focus:border-primary focus:ring-1 focus:ring-primary transition"
									/>
								</div>

								<div className="flex flex-col gap-1">
									<Label
										htmlFor="password"
										className="font-semibold text-sm"
									>
										Senha
									</Label>
									<Input
										id="password"
										type="password"
										placeholder="Digite sua senha"
										className="h-11 rounded-md border border-muted focus:border-primary focus:ring-1 focus:ring-primary transition"
									/>
								</div>

								<Button
									type="submit"
									className="mt-4 h-11 w-full bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
								>
									Entrar
								</Button>
							</form>
						</TabsContent>

						<TabsContent
							value="cadastro"
							className="w-full max-w-lg mx-auto"
						>
							<RegisterUserFormComponent
								callBack={(e) => handleTabsChange(e)}
							/>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}

export { LoginPage };
