import express from "express"
import { registerUser, loginUser, refreshToken, logoutUser, google } from "../controllers/userController.js"


const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/google", google)

router.get("/refresh-token", refreshToken)

router.delete("/logout", logoutUser)

export default router;