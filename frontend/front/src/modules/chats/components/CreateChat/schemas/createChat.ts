import {z} from "zod";

const createChatSchema = z.object({
  context: z.string().min(2).max(100),
  nome: z.string().min(2).max(100),
  modelo: z.string().min(2).max(100),
  descricao: z.string().min(2).max(100).optional(),
});

export type CreateChatSchemaType = z.infer<typeof createChatSchema>;

export { createChatSchema };