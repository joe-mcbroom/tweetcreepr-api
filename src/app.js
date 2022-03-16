import express from 'express';
import router from './router/index.js';
import 'dotenv/config';

const app = express();

app.use('/api', router);

export default app;
