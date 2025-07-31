import { UserContextProvider } from "@/modules/login/context/userContext";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<UserContextProvider>
				{children}
		</UserContextProvider>
	);
};

export { ContextProviders };

