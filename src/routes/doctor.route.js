import express from 'express';
import { authCheck } from '../middlewares/auth.middleware.js';
import { getMe, updateMe } from '../controllers/doctor.controller.js';

const router = express.Router();

router.get('/me', authCheck, getMe);
router.patch('/me', authCheck,updateMe);

export default router;