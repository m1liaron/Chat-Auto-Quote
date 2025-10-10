import express from "express";
const router = express.Router();

import { updateMessage } from "../controllers/controllers.js";

router.route("/:messageId").put(updateMessage);

export { router as messageRoute };