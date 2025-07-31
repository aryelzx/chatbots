import Robo from "@/assets/robo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { UseLoginHook } from "../hooks/useLogin";
import type { LoginInputDto } from "../dtos/login";
function LoginPage() {

    const navigate = useNavigate();
    const { handleLogin } = UseLoginHook();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params : LoginInputDto = {
            cpf: (event.target as HTMLFormElement).cpf.value,
            senha: (event.target as HTMLFormElement).password.value,
        };
        console.log(params, 'params')
        await handleLogin(params);
        return navigate("/dashboard");
    };
    return (
        <div className="min-h-screen bg-primary bg-cover bg-center flex items-center justify-center h-screen">
            <Card className="w-full max-w-md max-h-[65%] bg-white backdrop-blur-md shadow-xl relative">
                <img src={Robo} alt="Robo" className="w-45 h-auto absolute top-[-110px] left-[-90px]" />
                <CardContent className="flex flex-col gap-5 h-full items-center">
                    <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
                    <form className="space-y-4 w-full items-center flex flex-col justify-evenly" onSubmit={handleSubmit}>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input type="text" id="cpf" placeholder="Digite seu CPF" className="h-10" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label  htmlFor="password">Senha</Label>
                            <Input type="password" id="password" placeholder="Digite sua senha" className="h-10" />
                        </div>
                        <div className="w-full items-center flex flex-col justify-center">
                            <Button type="submit" className="w-2/3 h-10 mt-4 cursor-pointer">
                                Entrar
                            </Button>
                            <Button type="submit" variant={"outline"} className="w-2/3 h-10 mt-4 cursor-pointer">
                                Primeiro Acesso
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export { LoginPage };
