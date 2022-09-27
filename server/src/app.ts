import express from 'express';
import morgan from 'morgan';
import errorHandler from './utils/error-handler';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import userRouter from './resources/user/user.router.js';
import messageRouter from './resources/message/message.router.js';
import { signup, signin, protect } from './utils/auth';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression()); // Compress all routes

// Routes
app.post('/signup', signup);
app.post('/signin', signin);
app.use('/api/users', protect, userRouter);
app.use('/api/messages', messageRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'MembersOnly' });
});

// Handle 404
// eslint-disable-next-line
app.use((req, res, next) => {
  res.status(404);
  throw new Error('Not found');
});

// Error handler
app.use(errorHandler);

export default app;
