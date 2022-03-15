import express from 'express';
import { getTweetsByUsername } from '../controller/Tweets.js';
const router = express.Router();

router.get('/get-tweets/:username', getTweetsByUsername);

export default router;
