import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser); // userRoutes, id: send userID and grab it to call DB w id -> querystring
router.get("/:id/friends", verifyToken, getUserFriends); // grab user friends

// UPDATE
router.patch("/:id/:friendID", verifyToken, addRemoveFriend);

export default router;