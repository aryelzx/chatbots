import type { IChat } from "../interfaces/chat.interface";

type ChatContextType = {
	currentChat: {
		value: IChat;
		set: React.Dispatch<IChat>;
	};
};

export type { ChatContextType };
