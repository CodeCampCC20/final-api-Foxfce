import prisma from '../config/prisma.client.js';
import { createError } from '../utils/create.error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user =await  prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    console.log('user is ', user);
    if (user) {
      createError(400, { message: 'User already existed' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = await prisma.user.create({
      data: {
        username: username,
        password: hash,
      }
    });

    res.json({ message: `User ${result.username} is registered` });


  } catch (error) {
    next(error);
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = await prisma.user.findUnique({
      where:{
        username,
      }
    });
    if(!user) createError(400, 'Email or Password is invalid!');

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) createError(400, 'Email or Password is invalid!');

    const payload = {
      id: user.id,
      username: user.username,
      role: 'user'
    }

    const token = jwt.sign(payload, process.env.SIGN_KEY, {algorithm: 'HS256',expiresIn: '1h'});

    res.json({message : `Welcome back ${user.username}`, payload, token});

  } catch (error) {
    next(error);
  }
}

export const registerDoctor = async (req, res, next) => {
  try {
    console.log('register here');
    const { username, password, specialization } = req.body;
    const doctor =await prisma.doctor.findUnique({
      where: {
        username: username,
      },
    })
    console.log('doctor is ', doctor);
    if (doctor) {
      createError(400, { message: 'Doctor username already existed' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hash,
        specialization: specialization,
      }
    });

    res.status(200).json({ message: `Doctor ${result.username} is registered` });


  } catch (error) {
    next(error);
  }
}

export const loginDoctor = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const doctor = await prisma.doctor.findUnique({
      where:{
        username,
      }
    });
    if(!doctor) createError(400, 'Email or Password is invalid!');

    const checkPassword = await bcrypt.compare(password, doctor.password);
    if(!checkPassword) createError(400, 'Email or Password is invalid!');

    const payload = {
      id: doctor.id,
      username: doctor.username,
      role: 'doctor'
    }

    const token = jwt.sign(payload, process.env.SIGN_KEY, {algorithm: 'HS256',expiresIn: '1h'});

    res.json({message : `Welcome back ${doctor.username}`, payload, token});

  } catch (error) {
    next(error);
  }
}