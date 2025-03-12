import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getCallDetails from '../services/api';

export const fetchCallDetails = createAsyncThunk(
  'callsState/fetchCallDetails',
  async ({ inOut, dateStart, dateEnd }) => {
    const data = await getCallDetails(inOut, dateStart, dateEnd);
    return data;
  }
);

const callsStateSlice = createSlice({
  name: 'callsState',
  initialState: {
    callsState: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLocalCallDetails(state, action) {
      state.callsState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCallDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCallDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.callsState = action.payload;
      })
      .addCase(fetchCallDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLocalCallDetails } = callsStateSlice.actions;

export const selectors = (state) => state.callsState;
export default callsStateSlice.reducer;
