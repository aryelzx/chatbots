import { isValidCPF } from "@/shared/utils/validateCpf";
import { z } from "zod";

const registerUserSchema = z.object({
  role: z.string(), // 'A' = Admin, 'U' = User
  email: z.string().min(5, "Email deve ter pelo menos 5 caracteres").email("Email inválido"),
  nome: z.string().min(5, "Nome deve ter pelo menos 5 caracteres"),
  cpf: z
			.string()
			.min(11, "CPF deve ter 11 dígitos")
			.max(14, "CPF inválido")
			.refine(isValidCPF, {
				message: "CPF inválido",
			}),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(20, "Senha deve ter no máximo 20 caracteres"),
});

export type registerUserSchemaType = z.infer<typeof registerUserSchema>;

export { registerUserSchema };
