import { Router } from "express";

import {
  create,
  list,
  remove,
} from "../controllers/project.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", list);

router.post("/", create);

router.delete("/:id", remove);

export default router;