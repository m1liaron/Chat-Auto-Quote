import { createContext, type ReactNode, useContext, useState } from "react";
import type { Chat } from "../common/types";

type ChatContextType = {
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    chat: Chat | null;
    setChat: React.Dispatch<React.SetStateAction<Chat | null>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatsProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [chat, setChat] = useState<Chat | null>(null);

    return (
        <ChatContext.Provider value= {{ chats, setChats, chat, setChat }}>
            { children }
        </ChatContext.Provider>
  );
};


const useChats = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChats must be used within a ChatsProvider");
	}
	return context;
};

export { ChatsProvider, ChatContext, useChats };