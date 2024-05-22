import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CLIENT_API_URL } from '../../configs/environment';

export const updateClient = createAsyncThunk(
  'client/updateClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${CLIENT_API_URL}`, clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const clientsSlice = createSlice({
  name: 'client',
  initialState: {
    client: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
        state.error = null;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = clientsSlice.actions;
export default clientsSlice.reducer;
