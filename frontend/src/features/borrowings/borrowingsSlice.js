import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BORROWING_API_URL } from "../../configs/environment";

export const getClientBorrowings = createAsyncThunk(
  "borrowings/fetchBorrowings",
  async (clientId) => {
    try {
      const response = await axios.get(`${BORROWING_API_URL}/${clientId}`);
      return response.data.map(borrowing => ({ borrow_id, bo}));
    } catch (error) {
      console.log(error);
    }
  }
);

export const addBorrowing = createAsyncThunk(
  "borrowings/addBorrowing",
  async (clientId, bookId) => {
    try {
      const response = await axios.post(`${BORROWING_API_URL}/borrow`, {
        clientId,
        bookId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateBorrowing = createAsyncThunk(
  "borrowings/updateBorrowing",
  async (borrowingId) => {
    try {
      const response = await axios.put(`${BORROWING_API_URL}/return`, {
        borrowId: borrowingId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const borrowingsSlice = createSlice({
  name: "borrowings",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientBorrowings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientBorrowings.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getClientBorrowings.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const {} = borrowingsSlice.actions;
export const selectBorrowings = state => state.borrowings.data;
export default borrowingsSlice.reducer;
