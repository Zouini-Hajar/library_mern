import { Router } from "express";
import { deleteUser, getAllUsers, login, refreshToken, register, resetEmail, resetPassword, validateJWT } from "../controllers/AuthController.js";
import validation from "../middlewares/validationMiddleware.js";
import { loginUserSchema, registerUserSchema, resetEmailUserSchema, resetPwdUserSchema } from "../validations/userValidation.js";

const routes = Router();

routes.get("/", getAllUsers);
routes.post("/register", validation(registerUserSchema), register);
routes.post("/login", validation(loginUserSchema), login);
routes.put("/resetPassword", validation(resetPwdUserSchema), resetPassword);
routes.put("/resetEmail", validation(resetEmailUserSchema), resetEmail);
routes.delete("/delete/:email", deleteUser);
routes.post("/validate", validateJWT);
routes.post("/refresh", refreshToken);

export default routes;
