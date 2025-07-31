import {z} from "zod";
  // context: string;
  // nome: string;
  // modelo: string;
  // descricao?: string;
  // status: string;
  // user_id: number;
const createChatSchema = z.object({
  context: z.string().min(2).max(100),
  nome: z.string().min(2).max(100),
  modelo: z.string().min(2).max(100),
  descricao: z.string().min(2).max(100).optional(),
  status: z.string().min(1).max(100),
  user_id: z.number().min(1),
});

export type CreateChatSchemaType = z.infer<typeof createChatSchema>;

export { createChatSchema };