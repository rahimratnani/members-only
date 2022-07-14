import express from 'express';
import { me } from './user.controllers.js';

const router = express.Router();

router.get('/', me);

export default router;
