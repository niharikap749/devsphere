import { Router } from "express";
import * as controller from "./ai.controller";

const router = Router();

router.post("/chat", controller.chat);

export default router;