import type { messageType } from "../dtos/conversation";
import type { IChat } from "../interfaces/chat.interface";

type ChatContextType = {
	currentChat: {
		value: IChat;
		set: React.Dispatch<React.SetStateAction<IChat>>;
	};
	messagesByChat: {
		get: messageType[];
		set: React.Dispatch<React.SetStateAction<messageType[]>>;
	};
	handleSendMessage: (inputText: string) => Promise<void>;
	loadingMessages: {
		value: boolean;
		set: React.Dispatch<React.SetStateAction<boolean>>;
	};
	allChats: {
		value: IChat[];
		set: React.Dispatch<React.SetStateAction<IChat[]>>;
	}
};

export type { ChatContextType };
