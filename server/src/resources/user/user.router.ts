import express from 'express';
import { me, updateMe } from './user.controllers';

const router = express.Router();

router.get('/', me);

router.put('/:id', updateMe);

export default router;
