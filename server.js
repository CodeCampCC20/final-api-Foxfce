import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

//middleware
import error from './src/utils/error.js';
import notFound from './src/utils/not.found.js';

import authRouter from './src/routes/auth.route.js'; 
import userRouter from './src/routes/user.route.js';
import doctorRouter from './src/routes/doctor.route.js';
import healthRecordRouter from './src/routes/healthRecord.route.js';
import doctorNoteRouter from './src/routes/doctorNote.route.js';

const app = express();
const PORT = 3069;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/doctors',doctorRouter);
app.use('/api/health-records',healthRecordRouter);
app.use('/api/doctor-notes',doctorNoteRouter);

app.use(error);
app.use(notFound);

app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
})