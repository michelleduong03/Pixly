import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from '../middleware/auth.js';
import { getUser } from '../controllers/users.js';

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts); // grab user feed when on homepage 
router.get("/:userId/posts",  verifyToken, getUserPosts); // grab only relevant users posts


// UPDATE
router.patch("/:id/like", verifyToken, likePost); // for liking or unliking post

export default router;