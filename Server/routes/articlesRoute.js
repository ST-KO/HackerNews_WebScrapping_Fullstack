import { Router } from "express";
import { createArticles } from "../controllers/articlesController.js";

const router = Router();

router.post("/", createArticles);

export default router;
