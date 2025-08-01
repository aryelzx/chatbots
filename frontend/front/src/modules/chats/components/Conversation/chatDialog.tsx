import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { CircleEllipsis, Info } from "lucide-react";
import type { IChat } from "../../interfaces/chat.interface";
import truncateText from "@/shared/utils/truncateText";
import { useUserContext } from "@/modules/login/context/useUserContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)

interface ChatInfoDialogProps {
	currentChat: { value: IChat };
}

export function ChatInfoDialog({ currentChat }: ChatInfoDialogProps) {
	const chat = currentChat.value;
	const { user } = useUserContext();

	return (
		<Dialog>
			<DialogTrigger className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
				<CircleEllipsis size={26} />
			</DialogTrigger>
			<DialogContent className="bg-zinc-900 text-white border-zinc-700 max-w-xl">
				<DialogHeader>
					<DialogTitle className="text-lg flex items-center gap-2">
						<Info size={20} /> Detalhes da Conversa
					</DialogTitle>
					<DialogDescription className="text-zinc-400 text-sm mt-2">
						Aqui estão as informações completas sobre este chat.
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 space-y-3 text-sm">
					<p>
						<strong className="text-zinc-300">🧠 Modelo:</strong>{" "}
						<span className="text-zinc-200">{chat.modelo}</span>
					</p>
					<p>
						<strong className="text-zinc-300">💬 Nome:</strong>{" "}
						<span className="text-zinc-200">{chat.nome}</span>
					</p>
					{chat.descricao && (
						<p>
							<strong className="text-zinc-300">
								📄 Descrição:
							</strong>{" "}
							<span className="text-zinc-200">
								{truncateText(chat.descricao, 40)}
							</span>
						</p>
					)}
					<p>
						<strong className="text-zinc-300">🔖 Status:</strong>{" "}
						<span className="text-zinc-200 capitalize">
							{chat.status === "A" ? "Ativo" : "Inativo"}
						</span>
					</p>
					<p>
						<strong className="text-zinc-300">👤 Usuário:</strong>{" "}
						<span className="text-zinc-200">{user.value.nome}</span>
					</p>
					{chat.created_at && (
						<p>
							<strong className="text-zinc-300">
								📅 Criado em:
							</strong>{" "}
							<span className="text-zinc-200">
								{dayjs(chat.created_at).utc().format("DD/MM/YYYY HH:mm")}
							</span>
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
