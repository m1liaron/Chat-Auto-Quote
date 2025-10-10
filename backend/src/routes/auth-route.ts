import express from "express";
const router = express.Router();

import { register, login } from "../controllers/controllers.js";

router.post("/register", register);
router.post("/login", login);

export { router as authRoute };