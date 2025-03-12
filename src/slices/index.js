import { configureStore } from '@reduxjs/toolkit';
import callsStateSlice from './callsStateSlice.js';

export default configureStore({
  reducer: {
    callsState: callsStateSlice,
  },
});
