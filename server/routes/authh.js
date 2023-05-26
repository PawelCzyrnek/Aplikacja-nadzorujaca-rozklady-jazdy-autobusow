import express from "express";
import { login , logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/Login", login );
router.post("/Logout", logout);

export default router;