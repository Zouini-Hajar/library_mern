import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
    reducer: {
        books: booksReducer,
        user: userReducer
    }
});