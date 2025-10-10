import { Schema, model } from "mongoose";
import { User } from "./User.model.js";

const MessageSchema = new Schema(
    {
        text: { type: String, required: true },
        time: { type: String, required: true },
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true
        },
        userId: {
            type: Schema.Types.Mixed,
            ref: User
        }
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", MessageSchema);
export { Message };