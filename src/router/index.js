import express from 'express';
import { getTweetsByUsername } from '../controllers/Tweets.js';
const router = express.Router();

router.get('/', (req, res) =>
  res.status(400).json({
    error: 'Nothing to see here',
  })
);
router.get('/tweets', (req, res) =>
  res.status(400).json({
    error: 'Please specify a username',
  })
);
router.get('/tweets/:username', getTweetsByUsername);

export default router;
