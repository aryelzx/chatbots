import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import truncateText from "@/shared/utils/truncateText";
import { useUserContext } from "@/modules/login/context/useUserContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useChatContext } from "../../context/useChatContext";
dayjs.extend(utc);

export function ChatInfoDialog() {
	const { currentChat } = useChatContext();
	const { user } = useUserContext();

	return (
		<Dialog>
			<DialogTrigger className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
				<Info size={26} />
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
						<span className="text-zinc-200 capitalize">
							{currentChat.value?.modelo}
						</span>
					</p>
					<p>
						<strong className="text-zinc-300">🔎 Contexto:</strong>{" "}
						<span className="text-zinc-200 capitalize">
							{truncateText(currentChat.value?.context, 40)}
						</span>
					</p>
					<p>
						<strong className="text-zinc-300">💬 Nome:</strong>{" "}
						<span className="text-zinc-200 capitalize">
							{currentChat.value?.nome}
						</span>
					</p>
					{currentChat.value?.descricao && (
						<p>
							<strong className="text-zinc-300">
								📄 Descrição:
							</strong>{" "}
							<span className="text-zinc-200 textcapitalize">
								{truncateText(currentChat.value?.descricao, 40)}
							</span>
						</p>
					)}
					<p>
						<strong className="text-zinc-300">🔖 Status:</strong>{" "}
						<span className="text-zinc-200 capitalize">
							{currentChat.value?.status === "A"
								? "Ativo"
								: "Inativo"}
						</span>
					</p>
					<p>
						<strong className="text-zinc-300">👤 Usuário:</strong>{" "}
						<span className="text-zinc-200">{user.value.nome}</span>
					</p>
					{currentChat.value?.created_at && (
						<p>
							<strong className="text-zinc-300">
								📅 Criado em:
							</strong>{" "}
							<span className="text-zinc-200">
								{dayjs(currentChat.value?.created_at)
									.utc()
									.format("DD/MM/YYYY HH:mm")}
							</span>
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
