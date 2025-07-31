import { useCreateChatHook } from "./hooks/useCreateChat";

function CreateChatComponent() {
    const { form } = useCreateChatHook();
    return (
        <div>
            <h1>Criar nova conversa</h1>
        </div>
    );
}

export { CreateChatComponent }
