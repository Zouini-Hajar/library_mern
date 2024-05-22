import { Router } from "express";
import { addClient, deleteClient, getAllClients, getClientByEmail, getClientById, updateClient } from "../controllers/ClientController.js";
import validation from "../middlewares/validationMiddleware.js";
import { addClientSchema, updateClientSchema } from "../validations/clientValidation.js";
import validateAccessToken from "../middlewares/validateAccessToken.js";

const routes = Router();

routes.get('/', getAllClients);
routes.get('/getByEmail/:email', getClientByEmail);
routes.get('/:id', getClientById); // validateAccessToken should be used
routes.post('/', validation(addClientSchema), addClient);
routes.put('/', validation(updateClientSchema), updateClient);
routes.delete('/:id', deleteClient);

export default routes;