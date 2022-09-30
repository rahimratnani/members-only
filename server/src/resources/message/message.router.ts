import { Router } from 'express';
import { getMany, createOne, deleteOne } from './message.controller';
import { protect } from './../../utils/auth';

const router = Router();

/* 
/api/messages
*/
router.route('/').get(getMany).post(protect, createOne);

/* 
/api/messages/:id
*/
router.route('/:id').delete(protect, deleteOne);

export default router;
