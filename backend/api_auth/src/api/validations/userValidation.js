import yup from "yup";

export const registerUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  role: yup.string().oneOf(["client", "admin"]).required(),
  password: yup.string().min(8).required(),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const resetPwdUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  newPassword: yup.string().min(8).required(),
});

export const resetEmailUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  newEmail: yup.string().email().required(),
});
