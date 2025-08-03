import { Card, CardContent } from "@/components/ui/card";
import type { IChat } from "@/modules/chats/interfaces/chat.interface";
import dayjs from "dayjs";
import { MessageSquare } from "lucide-react";
import { forwardRef } from "react";

type Props = {
  chat: IChat;
} & React.HTMLAttributes<HTMLDivElement>;

const ChatCardComponent = forwardRef<HTMLDivElement, Props>(
  ({ chat, className, ...props }, ref) => {
    return (
      <Card
        key={chat.id}
        ref={ref}
        className={`cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group rounded-2xl border border-muted bg-zinc-800 ${className}`}
        {...props}
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
            <MessageSquare className="shrink-0 text-white" size={20} />
          </div>

          <p className="text-xs text-white/50 mt-2">
            Criado em:{" "}
            {dayjs(chat.created_at).format("DD [do] MM [de] YYYY [às] HH:mm")}
          </p>
        </CardContent>
      </Card>
    );
  }
);

ChatCardComponent.displayName = "ChatCardComponent";

export { ChatCardComponent };
