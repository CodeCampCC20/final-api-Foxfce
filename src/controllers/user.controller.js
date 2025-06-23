import prisma from "../config/prisma.client.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/create.error.js";

export const getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      omit: {
        password: true,
      }
    })

    res.json({
      message: "User data is here",
      result: user,
    });

  } catch (error) {
    next(error);
  }
}

export const updateMe = async (req, res, next) => {
  try {
    const {username, password } = req.body;
    const id = req.headers.id;
    // console.log(id);
    // console.log(typeof id);

    let user =await  prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    // console.log('user is ', user);
    if (user) {
      createError(400, { message: 'User already existed' });
    }

    const hash = bcrypt.hashSync(password, 10);

    user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        password: hash
      }
    })

    res.json({
      message: "User data updated",
      result: user,
    });

  } catch (error) {
    next(error);
  }
}