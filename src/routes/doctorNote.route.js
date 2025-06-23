import express from 'express';
import {
  authCheck,
  checkRoleDoctor
} from '../middlewares/auth.middleware.js';
import { createDoctorNote } from '../controllers/doctorNote.controller.js';

const router = express.Router();

router.post('/', authCheck, checkRoleDoctor, createDoctorNote);
// router.get('/user/:userId', authCheck, checkRoleDoctor,);
// router.get('/my-notes', authCheck, checkRoleDoctor,);
// router.get('/received', authCheck, checkRoleDoctor,);
// router.patch('/:id', authCheck, checkRoleDoctor,);
// router.delete('/:id', authCheck, checkRoleDoctor,);

export default router;