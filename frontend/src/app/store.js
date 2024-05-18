import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";

export default configureStore({
    reducer: {
        books: booksReducer
    }
});