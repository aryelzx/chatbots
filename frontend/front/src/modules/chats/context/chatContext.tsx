import React, { createContext, useState } from "react";
import type { ChatContextType } from "../types/useChatContext";
import type { IChat } from "../interfaces/chat.interface";

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [chat, setChat] = useState<IChat>(() => {
		const chatLocalStorage = localStorage.getItem("@chatbots_chat");
		if (!chatLocalStorage) return {} as IChat;
		return JSON.parse(chatLocalStorage);
	});

	const values: ChatContextType = {
		currentChat: {
			value: chat,
			set: setChat,
		},
	};
	return (
		<ChatContext.Provider value={values}>{children}</ChatContext.Provider>
	);
};

export { ChatContextProvider, ChatContext };
