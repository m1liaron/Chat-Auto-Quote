import express from "express";
const router = express.Router();

import {
    getChats,
    getChat,
    getChatMessages,
    createChat,
    updateChat,
    removeChat,
} from "../controllers/controllers.js";

router.route("/").get(getChats).post(createChat);
router.route("/:chatId").get(getChat).put(updateChat).delete(removeChat);
router.route("/:chatId/messages").get(getChatMessages);

export { router as chatRoute };