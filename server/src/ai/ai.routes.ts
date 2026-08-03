import { Router } from "express";
import * as controller from "./ai.controller";
import { upload } from "../uploads/upload.middleware";
import { uploadDocument } from "./document.controller";

const router = Router();

router.post("/chat", controller.chat);

router.post(
    "/upload",
    upload.single("file"),
    uploadDocument
  );

export default router;