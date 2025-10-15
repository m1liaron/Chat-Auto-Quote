import { useEffect } from "react";
import { ChatArea } from "./components/ChatArea/ChatArea";
import { UserListSidebar } from "./components/UserListSidebar/UserListSidebar";
import { apiClient } from "@/api/apiClient";
import { useUser } from "@/contexts/UserProvider";
import { User } from "@/common/types";

const MainPage = () => {
    const { setUser } = useUser();

    useEffect(() => {
        const getUser = async () => {
            const response = await apiClient.get("/users") as User;
            if(Object.keys(response).length > 0) {
                setUser(response);
            }
        }
        getUser();
    }, []);

    return (
        <>
            <UserListSidebar />
            <ChatArea/>
        </>
    )
}

export { MainPage };