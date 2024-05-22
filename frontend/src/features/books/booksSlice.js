import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BOOK_API_URL } from "../../configs/environment";

export const getBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await axios.get(BOOK_API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  try {
    const response = await axios.post(BOOK_API_URL, book);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateBook = createAsyncThunk("books/updateBook", async (book) => {
  try {
    const response = await axios.put(BOOK_API_URL, book);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  try {
    const response = await axios.delete(`${BOOK_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(updateBook.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = booksSlice.actions;
export const selectAllBooks = (state) => state.books.data;
export default booksSlice.reducer;
