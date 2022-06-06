import express from 'express';
import {
  getOne,
  getMany,
  updateOne,
  deleteOne,
  createOne,
} from './user.controllers.js';

const router = express.Router();

/* 
/api/users
*/
router.route('/').get(getMany).post(createOne);

/* 
/api/users/:id 
*/
router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

export default router;
