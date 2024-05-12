import {Router} from 'express';
import {sendEmail} from '../controllers/EmailController.js'
const router = Router();

router.post('/sendEmail',sendEmail);

export default router;