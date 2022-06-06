import { Router } from 'express';
import {
  getOne,
  getMany,
  createOne,
  updateOne,
  deleteOne,
} from './message.controller.js';

const router = Router();

/* 
/api/messages
*/
router.route('/').get(getMany).post(createOne);

/* 
/api/messages/:id
*/
router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

export default router;
