import express from "express";
import { getTweets } from "../controller/getTweets.js";
const router = express.Router();

router.get("/get-tweets", getTweets);

export default router;
