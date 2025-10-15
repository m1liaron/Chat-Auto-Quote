import express from "express";

const router = express.Router();

import type { RequestHandler } from "../common/types/authController.js";
import {
	createChat,
	getChat,
	getChatMessages,
	getChats,
	removeChat,
	updateChat,
} from "../controllers/controllers.js";

router
	.route("/")
	.get(getChats as RequestHandler)
	.post(createChat);
router.route("/:chatId").get(getChat).put(updateChat).delete(removeChat);
router.route("/:chatId/messages").get(getChatMessages);

export { router as chatRoute };
