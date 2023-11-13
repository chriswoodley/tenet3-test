import { createSlice } from '@reduxjs/toolkit'

export const timeSlice = createSlice({
  name: 'time',
  initialState: {
    fizz: '',
    buzz: '',
    elapsedTime: 0,
  },
  reducers: {
    setTime: (state, { payload }) => {
      state.fizz = Number(payload.fizz)
      state.buzz = Number(payload.buzz)
    },
    setElapsedTime: (state, { payload }) => {
      state.elapsedTime = payload
    }
  }
});

export const { setTime, setElapsedTime } = timeSlice.actions;

export default timeSlice.reducer;