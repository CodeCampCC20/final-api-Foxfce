import express from 'express';
import { authCheck } from '../middlewares/auth.middleware.js';
import {
  createHealthRecord,
  deleteHealthRecordById,
  editHealthRecordById,
  getHealthRecord,
  getHealthRecordById,
} from '../controllers/healthRecord.controller.js';

const router = express.Router();

router.post('/', authCheck, createHealthRecord);
router.get('/:id', authCheck,getHealthRecordById);
router.get('/', authCheck, getHealthRecord);
router.patch('/:id', authCheck,editHealthRecordById);
router.delete('/:id', authCheck,deleteHealthRecordById);

export default router;