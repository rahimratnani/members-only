import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './utils/error-handler.js';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import userRouter from './resources/user/user.router.js';
import messageRouter from './resources/message/message.router.js';
import { signup, signin } from './utils/auth.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression()); // Compress all routes

// Routes
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.post('/signup', signup);
app.post('/signin', signin);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Express Boilerplate' });
});

// Handle 404
app.use((req, res, next) => {
  res.status(404);
  throw new Error('Not found');
});

// Error handler
app.use(errorHandler);

export default app;
