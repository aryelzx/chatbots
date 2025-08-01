import {z} from "zod";

const createChatSchema = z.object({
  context: z.string()
    .min(2, { message: "pelo menos 2 caracteres." })
    .max(100, { message: "no máximo 100 caracteres." }),
  nome: z.string()
    .min(2, { message: "pelo menos 2 caracteres." })
    .max(100, { message: "no máximo 100 caracteres." }),
  modelo: z.string()
    .min(2, { message: "escolha um modelo" })
    .max(400, { message: "no máximo 400 caracteres." }),
  descricao: z.string()
    .min(2, { message: "pelo menos 2 caracteres." })
    .max(400, { message: "no máximo 400 caracteres." })
    .optional(),
});

export type CreateChatSchemaType = z.infer<typeof createChatSchema>;

export { createChatSchema };