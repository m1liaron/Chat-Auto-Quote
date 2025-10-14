import { ChatArea } from "./components/ChatArea/ChatArea";
import { UserListSidebar } from "./components/UserListSidebar/UserListSidebar";

const MainPage = () => {
    return (
        <>
            <UserListSidebar />
            <ChatArea/>
        </>
    )
}

export { MainPage };