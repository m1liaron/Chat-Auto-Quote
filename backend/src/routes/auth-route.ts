import express from "express";

const router = express.Router();

import { googleLogin, login, register } from "../controllers/controllers.js";

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);

export { router as authRoute };
