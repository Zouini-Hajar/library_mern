import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BOOK_API_URL = 'http://localhost:3001/books';

export const getBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        try {
            const response = await axios.get(BOOK_API_URL);
            return response.data;
        } catch(error) {
            console.log(error);
        }
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
    }
});

export const {} = booksSlice.actions;
export const selectAllBooks = state => state.books.data;
export default booksSlice.reducer;