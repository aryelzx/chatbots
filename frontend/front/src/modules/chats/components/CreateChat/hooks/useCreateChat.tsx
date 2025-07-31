import { useForm } from "react-hook-form";
import { createChatSchema, type CreateChatSchemaType } from "../schemas/createChat";
import { zodResolver } from "@hookform/resolvers/zod";

function useCreateChatHook(){
  
  const form = useForm<CreateChatSchemaType>({
    resolver: zodResolver(createChatSchema)
  })

  return {
    form 
  }
}

export { useCreateChatHook };