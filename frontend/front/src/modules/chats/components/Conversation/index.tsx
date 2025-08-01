
import useConversation from "../../hooks/useConversation";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { CreateChatComponent } from "../CreateChat";
import { useEffect } from "react";

function ChatConversationComponent() {
    const { user } = useUserContext();
    const { messages } = useConversation();

    useEffect(() => {
        if (user.value.hasChat) {
            console.log("Usuário tem chat!", user.value.hasChat);
        }
    }, [user.value.hasChat, messages]);

    return (
        <div className="flex flex-col h-full w-full">
            <header>
                <h1 className="text-2xl font-bold">Chats</h1>
                <p className="text-gray-600">Gerencie suas conversas aqui.</p>
            </header>
            {user.value.hasChat ? (
               <CreateChatComponent />
                // <WellcomeComponent />
            ) : (
                <div className="flex flex-col h-full p-4">
                    <div className="flex-1 overflow-y-auto text-2xl font-black">
                        {messages.get.length > 0 && messages.get.map((message) => (
                            <p key={message.id}>{message.mensagem}</p>
                        ))}
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Digite sua mensagem..."
                            className="w-full p-2 border rounded"
                        />
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => null}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export { ChatConversationComponent };

