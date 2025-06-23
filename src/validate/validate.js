import { object, ref, string } from 'yup';

export const registerSchemaUser = object({
  username: string()
    .required("Please input your Email")
    .email("Username invalid"),
  password: string()
    .required("Please input password")
    .min(6, "Need more than 6 characters"),
  confirmPassword: string()
    .required("Please input password again")
    .oneOf([ref("password"), null], "Password is not matched"),
});

export const registerSchemaDoctor = object({
  username: string()
    .required("Please input your username")
    .email("Username invalid"),
  password: string()
    .required("Please input password")
    .min(6, "Need more than 6 characters"),
  confirmPassword: string()
    .required("Please input password again")
    .oneOf([ref("password"), null], "Password is not matched"),
  specialization: string()
  .oneOf([
    'CARDIOLOGY',
    'DERMATOLOGY',
    'NEUROLOGY',
    'PEDIATRICS',
    'GYNECOLOGY',
    'ONCOLOGY',
    'FAMILY_MEDICINE',
    'UROLOGY',
    'ENDOCRINOLOGY',
    'PSYCHIATRY',
    'EMERGENCY_MEDICINE',
    'GENERAL_SURGERY',
    'RADIOLOGY',
    'PLASTICSURGERY',
    'NONE'])
});

export const loginSchema = object({
  username: string()
    .required("Please input your username")
    .email("Username invalid"),
  password: string()
    .required("Please input password")
    .min(6, "Need more than 6 characters"),
});

export const validate = (schema) =>async (req, res, next)=>{
  try {
    await schema.validate(req.body, {abortEarly: false});
    next();
  } catch (error) {
    const errMsg = error.errors.map((item)=> item);
    const errTxt = errMsg.join(',');
    const mergeErrText = new Error(errTxt);
    next(mergeErrText);
  }

}