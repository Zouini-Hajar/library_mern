import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import userReducer from "../features/user/userSlice";
import borrowingsReducer from "../features/borrowings/borrowingsSlice";
import cartReducer from "../features/cart/cartSlice";
 
export default configureStore({
    reducer: {
        books: booksReducer,
        user: userReducer,
        borrowings: borrowingsReducer,
        cart: cartReducer
    }
});