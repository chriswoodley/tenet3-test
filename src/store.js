import { configureStore } from '@reduxjs/toolkit';
import timeReducer from './features/time/time-slice';

export default configureStore({
  reducer: {
    time: timeReducer
  }
});
