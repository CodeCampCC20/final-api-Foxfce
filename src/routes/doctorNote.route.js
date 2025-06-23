import express from 'express';
import {
  authCheck,
  checkRoleDoctor
} from '../middlewares/auth.middleware.js';
import {
  createDoctorNote,
  deleteDoctorNoteById,
  editDoctorNoteById,
  getDoctorNoteByID,
  getMyNote,
  getPatientNoteByID
} from '../controllers/doctorNote.controller.js';

const router = express.Router();

router.post('/', authCheck, checkRoleDoctor, createDoctorNote);
router.get('/my-notes', authCheck, checkRoleDoctor, getMyNote);
router.get('/user/:userId', authCheck, checkRoleDoctor, getDoctorNoteByID);
router.get('/received', authCheck, getPatientNoteByID);
router.patch('/:id', authCheck, checkRoleDoctor, editDoctorNoteById);
router.delete('/:id', authCheck, checkRoleDoctor, deleteDoctorNoteById);

export default router;