import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { IChat } from "@/modules/chats/interfaces/chat.interface";
import { Bot, MessageSquareShare, SquarePen } from "lucide-react";

type Props = {
  chat: IChat;
  handleModal: (chat: IChat, isOpen: boolean) => void;
  handleRedirect: () => void;
}

function ChatCardComponent({ chat, handleModal, handleRedirect }: Props) {
  return (
    <Card
      key={chat.id}
      className={`transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group rounded-2xl border border-muted bg-zinc-800`}
    >
      <CardContent className="p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl text-secondary font-semibold group-hover:underline truncate">
              {chat.nome}
            </h2>
            <p className="text-sm text-white/50 mt-1 line-clamp-2">
              {chat.descricao}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-2 rounded-full bg-zinc-300 cursor-pointer hover:bg-zinc-400" onClick={() => handleModal(chat, true)}>
                  <SquarePen className="shrink-0 text-primary" size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-2 rounded-full bg-zinc-300 cursor-pointer hover:bg-zinc-400" onClick={handleRedirect}>
                  <MessageSquareShare className="shrink-0 text-primary" size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ir para conversa</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex gap-2 items-center text-center">
          <span>
            <Bot className="text-white" size={20} />
          </span>
          <p className="text-md text-white/50">
            {chat.modelo}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}



export { ChatCardComponent };
