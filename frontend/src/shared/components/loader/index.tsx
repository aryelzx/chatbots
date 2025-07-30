import { BotMessageSquare } from "lucide-react";

type Props = {
	message?: string;
	variant: "blue" | "white";
};

function LoaderComponent({ message, variant }: Props) {
	return (
		<div className="flex items-center space-x-2 animate-pulse">
			{message && (
				<>
					<BotMessageSquare color={variant} size={30} />
				</>
			)}
			<div className="flex items-center space-x-2">
				<span className="ml-2 text-xl">{message}</span>
			</div>
		</div>
	);
}
export { LoaderComponent };
