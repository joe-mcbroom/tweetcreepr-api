import express from 'express';
import { getTweetsByUsername } from '../controller/getTweets.js';
const router = express.Router();

router.get('/get-tweets/:username', getTweetsByUsername);

export default router;
