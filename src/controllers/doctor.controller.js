import prisma from "../config/prisma.client.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/create.error.js";

export const getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: Number(id)
      },
      omit: {
        password: true,
      }
    })

    res.json({
      message: "Doctor data is here",
      result: doctor,
    });

  } catch (error) {
    next(error);
  }
}

export const updateMe = async (req, res, next) => {
  try {
    const {username, password, specialization } = req.body;
    const id = req.headers.id;
    // console.log(id);
    // console.log(typeof id);

    let doctor =await  prisma.doctor.findUnique({
      where: {
        username: username,
      },
    })
    // console.log('doctor is ', doctor);
    if (doctor) {
      createError(400, { message: 'Doctor username already existed' });
    }

    const hash = bcrypt.hashSync(password, 10);

    doctor = await prisma.doctor.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        password: hash,
        specialization: specialization,
      }
    })

    res.json({
      message: "Doctor data updated",
      result: doctor,
    });

  } catch (error) {
    next(error);
  }
}