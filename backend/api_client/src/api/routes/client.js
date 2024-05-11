import { Router } from "express";
import { addClient, deleteClient, getAllClients, getClient, updateClient } from "../controllers/ClientController.js";
import validation from "../middlewares/validationMiddleware.js";
import { addClientSchema, updateClientSchema } from "../validations/clientValidation.js";

const routes = Router();

routes.get('/', getAllClients);
routes.get('/:id', getClient);
routes.post('/', validation(addClientSchema), addClient);
routes.put('/', validation(updateClientSchema), updateClient);
routes.delete('/:id', deleteClient);

export default routes;