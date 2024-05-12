import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getBook, updateBook } from "../controllers/BookController.js";
import validation from "../middlewares/validationMiddleware.js";
import { addBookSchema, updateBookSchema } from "../validations/bookValidation.js";
import validateAccessToken from "../../../../api_client/src/api/middlewares/validateAccessToken.js";

const routes = Router();

routes.get('/', getAllBooks);
routes.get('/:id', getBook);
routes.post('/', validateAccessToken, validation(addBookSchema), addBook);
routes.put('/', validateAccessToken, validation(updateBookSchema), updateBook);
routes.delete('/:id', validateAccessToken, deleteBook);

export default routes;