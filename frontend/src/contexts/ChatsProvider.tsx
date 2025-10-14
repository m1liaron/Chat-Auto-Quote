import { createContext, type ReactNode, useContext, useState } from "react";
import type { Chat } from "../common/types";

const defaultChats = [
    {
        _id: "1",
        firstName: "Alice",
        lastName: "Freeman",
    },
    {
        _id: "2",
        firstName: "Josefina",
        lastName: "",
    },
    {
        _id: "3",
        firstName: "Alex",
        lastName: "",
    },
    {
        _id: "4",
        firstName: "Peter",
        lastName: ""
    },
]

type ChatContextType = {
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    chat: Chat | null;
    setChat: React.Dispatch<React.SetStateAction<Chat | null>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatsProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<Chat[]>(defaultChats);
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