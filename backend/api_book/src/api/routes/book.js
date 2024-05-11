import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getBook, updateBook } from "../controllers/BookController.js";
import validation from "../middlewares/validationMiddleware.js";
import { addBookSchema, updateBookSchema } from "../validations/bookValidation.js";

const routes = Router();

routes.get('/', getAllBooks);
routes.get('/:id', getBook);
routes.post('/', validation(addBookSchema), addBook);
routes.put('/', validation(updateBookSchema), updateBook);
routes.delete('/:id', deleteBook);

export default routes;