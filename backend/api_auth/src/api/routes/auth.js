import { Router } from "express";
import { login, refreshToken, register, validateJWT } from "../controllers/AuthController.js";
import validation from "../middlewares/validationMiddleware.js";
import { loginUserSchema, registerUserSchema } from "../validations/userValidation.js";

const routes = Router();

routes.post("/register", validation(registerUserSchema), register);
routes.post("/login", validation(loginUserSchema), login);
routes.post("/validate", validateJWT);
routes.post("/refresh", refreshToken);

export default routes;
