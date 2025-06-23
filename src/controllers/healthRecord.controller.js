import prisma from "../config/prisma.client.js";
import { createError } from "../utils/create.error.js";

export const createHealthRecord = async (req, res, next) => {
  try {
    const id = req.headers.id
    const { type, value } = req.body;

    const result = await prisma.health_Record.create({
      data: {
        type: type,
        value: value,
        patient_Id: id,
      }
    });

    res.json({
      message: "Health record is created",
      result: {
        type: result.type,
        value: result.value,
        patient_id: result.patient_Id,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const getHealthRecord = async (req, res, next) => {
  try {
    const result = await prisma.health_Record.findMany()

    res.json({
      message: `Health record of all patient listed`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const getHealthRecordById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.health_Record.findMany({
      where: {
        id: Number(id),
      },
    })

    res.json({
      message: `Health record #${id}`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const editHealthRecordById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {type, value} = req.body
    const result = await prisma.health_Record.update({
      where: {
        id: Number(id),
      },
      data:{
        type: type,
        value: value,
      }
    })

    res.json({
      message: `Health record #${id} has been edited`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}

export const deleteHealthRecordById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.health_Record.delete({
      where: {
        id: Number(id),
      },
    })

    res.json({
      message: `Health record #${id} has been Deleted`,
      result: {
        result,
      }
    });

  } catch (error) {
    next(error);
  }
}