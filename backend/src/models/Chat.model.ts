import { model, Schema } from "mongoose";

const ChatSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		avatar: { type: String, required: false },
	},
	{
		timestamps: true,
	},
);

const Chat = model("Chat", ChatSchema);
export { Chat };
