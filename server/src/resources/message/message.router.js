import { Router } from 'express';
import { getMany, createOne } from './message.controller.js';
import { protect } from './../../utils/auth.js';

const router = Router();

/* 
/api/messages
*/
router.route('/').get(getMany).post(protect, createOne);

/* 
/api/messages/:id
*/
// router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);

export default router;
