import React, { useEffect } from "react";
import { ChatItem } from "./components/ChatItem";
import { useChats } from "@/contexts/ChatsProvider";
import { useUser } from "@/contexts/UserProvider";
import type { Chat } from "@/common/types";
import { apiClient } from "@/api/apiClient";
import "./UserListSidebar.css";
import { Link } from "react-router-dom";
import { AppPath } from "@/common/enums";
import DefaultAvatar from "@/assets/images/default-avatar.jpg"

const UserListSidebar: React.FC = () => {
    const { setChat, chats, setChats } = useChats();
    const { user, setUser } = useUser();

    useEffect(() => {
        const getChats = async () => {
            const data = await apiClient.get<Chat[]>("/chats");
            setChats(data);
        }
        getChats();
    }, []);
    

    const createChat = async () => {
        const newChatData = {
            firstName: "User firstname",
            lastName: "User lastname",
            userId: user?._id
        }
        const data: Chat = await apiClient.post<Chat>("/chats", newChatData);
        setChats(prev => [...prev, data]);
        setChat(data);
    }

    const handleLogout = () => {
        const sure = confirm("Are you sure you want to logout?");
        if(sure) {
            setUser(null);
            localStorage.removeItem("token");
        }
    }

    return (
        <div className="sidebar">
            <div className="top-bar">
                    {user?.avatar && (
                        <>
                            <div>
                                <img src={user.avatar || DefaultAvatar} alt="User Avatar" className="avatar"/>
                                <h3>{user.firstName} {user.lastName}</h3>
                            </div>
                            <button onClick={handleLogout}>Log Out</button>
                        </>
                    )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <input
                    type="text"
                    placeholder="Search or start new chat"
                    className="search-bar"
                />
                <Link to={AppPath.Login}>
                    <button>Log in</button>
                </Link>
            </div>
            <div className="chat-list">
                {chats.map(chat => <ChatItem key={chat._id} item={chat} setChat={setChat} />)}
            </div>

            <button className="chat__add__button" onClick={createChat}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
            </button>
        </div>
    )
}

export { UserListSidebar };  