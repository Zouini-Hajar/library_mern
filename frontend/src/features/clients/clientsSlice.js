import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CLIENT_API_URL } from '../../configs/environment';

export const getAllClients = createAsyncThunk("clients/fetchClients", async () => {
  try {
    const response = await axios.get(CLIENT_API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${CLIENT_API_URL}`, clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (clientId, { rejectWithValue }) => {
    try {
      await axios.delete(`${CLIENT_API_URL}/${clientId}`);
      return clientId; // Return the deleted client ID
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted client from the data array
        state.data = state.data.filter(client => client._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllClients = (state) => state.clients.data;
export default clientsSlice.reducer;
