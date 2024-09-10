import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // allow express to identify that these routes will all be configured, have in separate files

router.post("/login", login);

export default router;