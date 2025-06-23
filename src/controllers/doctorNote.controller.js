import prisma from "../config/prisma.client.js";
import { createError } from "../utils/create.error.js";

export const createDoctorNote = async (req, res, next) => {
  try {
    const id = req.headers.id
    const { note, patient_Id } = req.body;

    const result = await prisma.doctor_Note.create({
      data: {
        note: note,
        patient_Id: Number(patient_Id),
        doctorId: id,
      }
    });

    res.json({
      message: "Doctor Note has been created",
      result: result,
    });

  } catch (error) {
    next(error);
  }
}

export const getMyNote = async (req, res, next) => {
  try {
    const id = req.headers.id
    console.log(req.headers.id);
    console.log(id);
    const result = await prisma.doctor_Note.findMany({
      where:{
        doctorId: Number(id),
      }
    })

    res.json({
      message: `Your #${id} Doctor Note has been listed`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const getDoctorNoteByID = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const result = await prisma.doctor_Note.findMany({
      where: {
        patient_Id: Number(id),
      },
    })

    res.json({
      message: `Health record of patient #${id} is listed`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const getPatientNoteByID = async (req, res, next) => {
  try {
    const id = req.headers.id;
    const result = await prisma.doctor_Note.findMany({
      where: {
        patient_Id: Number(id),
      },
    })

    res.json({
      message: `Doctor note of patient #${id} has been listed`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const editDoctorNoteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { note, value } = req.body
    const result = await prisma.doctor_Note.update({
      where: {
        id: Number(id),
      },
      data: {
        note: note,
      }
    })

    res.json({
      message: `Doctor note #${id} has been edited`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const deleteDoctorNoteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.doctor_Note.delete({
      where: {
        id: Number(id),
      },
    })

    res.json({
      message: `Doctor Note #${id} has been Deleted`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}