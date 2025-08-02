import { BotMessageSquare } from "lucide-react";

type Props = {
	message?: string;
};

function LoaderComponent({ message }: Props) {
	return (
		<div className="flex items-center space-x-2 animate-pulse">
			{message && (
				<>
					<BotMessageSquare color="blue" size={30} />
				</>
			)}
			<div className="flex items-center space-x-2">
				<span className="ml-2 text-2xl font-semibold">{message}</span>
			</div>
		</div>
	);
}
export { LoaderComponent };
