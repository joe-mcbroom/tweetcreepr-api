import express from 'express';
import { getTweetsByUsername } from '../controllers/Tweets.js';
const router = express.Router();

router.get('/tweets/:username', getTweetsByUsername);

export default router;
