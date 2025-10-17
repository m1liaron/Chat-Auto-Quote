import express from "express";

const router = express.Router();

import {
	facebookLogin,
	googleLogin,
	login,
	register,
} from "../controllers/controllers.js";

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);

export { router as authRoute };
