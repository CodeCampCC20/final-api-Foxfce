import { createError } from "../utils/create.error.js";
import jwt from 'jsonwebtoken';

export const authCheck = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      createError(401, 'Token is missing');
    }

    const token = header.split(' ').at(-1);

    jwt.verify(token, process.env.SIGN_KEY, (error, decode) => {
      if (error) createError(401, 'Token is invalid!');
      // console.log(decode.id);
      // req.headers.id = decode.id;
      // console.log(req.headers.id);

      if (req.method === 'GET') {
        // req.headers.id = decode.id;
        req.user = decode;
        req.headers.role = decode.role;
        next();
      }
      if (req.method === "PATCH" || req.method === "POST" || req.method === "DELETE" || req.method === "PUT") {
        // const {username,password} = req.body;
        // req.body = {decode.id, username, password};
        req.headers.id = decode.id;
        req.headers.role = decode.role;
        next();
      }
    })

  } catch (error) {
    next(error);

  }
}

export const checkRoleDoctor = (req, res, next) => {
  try {
    const {id, role} = req.headers
    if(role === "doctor"){
      next();
    }

    createError(401, 'User Unauthorized');

  }catch (error) {
    next(error);
  }
}