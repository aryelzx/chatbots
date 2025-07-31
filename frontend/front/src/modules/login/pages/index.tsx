import Robo from "@/assets/robo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
function LoginPage() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-primary bg-cover bg-center flex items-center justify-center h-screen">
            <Card className="w-full max-w-md max-h-[65%] bg-white backdrop-blur-md shadow-xl relative">
                <img src={Robo} alt="Robo" className="w-45 h-auto absolute top-[-110px] left-[-90px]" />
                <CardContent className="flex flex-col gap-5 h-full items-center">
                    <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
                    <form className="space-y-4 w-full items-center flex flex-col justify-evenly">
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">CPF</Label>
                            <Input type="email" id="email" placeholder="Digite seu CPF" className="h-10" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Senha</Label>
                            <Input type="password" id="email" placeholder="Digite sua senha" className="h-10" />
                        </div>
                        <div className="w-full items-center flex flex-col justify-center">
                            <Button className="w-2/3 h-10 mt-4 cursor-pointer" onClick={() => navigate("/dashboard")}>
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
