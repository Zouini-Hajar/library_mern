import { Router } from 'express';
import { getClientBorrows, addBorrow, updateBorrow} from '../controllers/BorrowController.js';

const router = Router();

router.get('/:clientId',getClientBorrows);
router.post('/borrow',addBorrow);
router.put('/return',updateBorrow);

export default router;