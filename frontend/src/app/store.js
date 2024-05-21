import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import userReducer from "../features/user/userSlice";
import borrowingReducer from "../features/borrowings/borrowingsSlice";

export default configureStore({
    reducer: {
        books: booksReducer,
        user: userReducer,
        borrowings: borrowingReducer
    }
});