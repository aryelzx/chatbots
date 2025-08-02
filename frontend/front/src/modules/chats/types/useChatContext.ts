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
};

export type { ChatContextType };
