import type React from "react";
import { useState } from "react";
import { apiClient } from "@/api/apiClient";
import type { Message } from "@/common/types";
import { useUser } from "@/contexts/UserProvider";

interface MessageBubbleProps {
    id: string;
    text: string;
    time: string;
    left?: boolean;
    userId: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ id, text, time, left, userId }) => {
  const [showMessageEdit, setShowMessageEdit] = useState(false);
  const [messageText, setMessageText] = useState(text);
  const { user } = useUser();

  const updateMessage = async () => {
    const data = await apiClient.put<Message>(`/messages/${id}`, { text: messageText });
    setMessageText(data.text);
    setShowMessageEdit(false);
  }

  return (
    <div className={`message ${left ? "left" : "right"}`}>
      {showMessageEdit ? (
        <>
          <input value={messageText} placeholder={text} onChange={(e) => setMessageText(e.target.value)}/>
          <button type="button" className="message__update__button" onClick={updateMessage}>update</button>
        </>
      ) : (
        <p>{messageText}</p>
      )}
      <span>{time}</span>
      
      {user?._id === userId && (
        <svg onClick={() => setShowMessageEdit(!showMessageEdit)} className="message__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
      )}
    </div>
  );
}

export { MessageBubble };