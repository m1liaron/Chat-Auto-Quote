import express from "express";
const router = express.Router();

import {
    getUser
} from "../controllers/controllers.js";
import type { RequestHandler } from "../common/types/types.js";

router.get("/", getUser as RequestHandler)

export { router as userRoute };