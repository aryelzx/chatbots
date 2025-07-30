import { ChatContextProvider } from "@/modules/chats/context/chatContext";
import { UserContextProvider } from "@/modules/login/context/userContext";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<UserContextProvider>
			<ChatContextProvider>{children}</ChatContextProvider>
		</UserContextProvider>
	);
};

export { ContextProviders };
