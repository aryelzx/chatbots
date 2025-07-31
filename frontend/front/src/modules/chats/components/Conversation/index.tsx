
import { useState } from "react";
import { WellcomeComponent } from "../Wellcome";
import useConversation from "../../hooks/useConversation";

function ChatConversationComponent() {
    const [wellcomeMessage, setWelcomeMessage] = useState<boolean>(true);
    const { messages } = useConversation();

    return (
        <div className="flex flex-col h-full w-full">
            {wellcomeMessage ? (
                <WellcomeComponent />
            ) : (
                <div className="flex flex-col h-full p-4">
                    <div className="flex-1 overflow-y-auto">
                        {/* Aqui você pode adicionar a lógica para exibir mensagens de chat */}
                        {messages.get.map((message) => (
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
                            onClick={() => setWelcomeMessage(true)}
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

