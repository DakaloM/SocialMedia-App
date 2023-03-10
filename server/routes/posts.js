import  express from 'express';
import { getPost, createPost, deletePost } from "../controllers/post.js"

const router = express.Router();

router.get("/", getPost)
router.post("/", createPost)
router.delete("/:id", deletePost)

export default router;