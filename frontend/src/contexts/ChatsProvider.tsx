import { createContext, type ReactNode, useContext, useState } from "react";
import type { Chat } from "../common/types";

const defaultChats = [
    {
        _id: "1",
        firstName: "Alice",
        lastName: "Freeman",
        avatar: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        _id: "2",
        firstName: "Josefina",
        lastName: "",
        avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
    },
    {
        _id: "3",
        firstName: "Alex",
        lastName: "",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png"
    }
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