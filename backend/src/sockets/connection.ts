import getRandomQuote from "../api/getRandomQuote.js";
import type { IMessage } from "../common/types/types.js";
import type { AuthenticatedSocket } from "../middlewares/socketAuthMiddleware.js";
import { Message } from "../models/Message.model.js";

const connectionSocket = (socket: AuthenticatedSocket) => {
	console.log("Client connected via Socket.IO:", socket.id);

	socket.on("sendMessage", async (message: IMessage) => {
		if (!socket.user) return;
		const userMessage = await Message.create({
			...message,
			userId: socket.user.userId,
		});
		socket.emit("receiveMessage", userMessage);

		const randomQuote = await getRandomQuote();

		const responseData = {
			text: `${randomQuote.quote} \n - ${randomQuote.author}`,
			time: new Date().toLocaleString(),
			chatId: message.chatId,
			userId: "server",
		};

		const serverMessage = await Message.create(responseData);
		socket.emit("receiveMessage", serverMessage);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
	});
};

export { connectionSocket };
