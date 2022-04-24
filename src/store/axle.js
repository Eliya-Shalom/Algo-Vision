import { createSlice } from "@reduxjs/toolkit";

const axleConfig = createSlice({
  name: "axle",
  initialState: {
    numOfBars: 100,
    axle: [],
    align: "flex-end",
  },
  reducers: {
    axleChanged: (state, { payload }) => {
      const { att, val } = payload;
      state[att] = val;
    },
  },
});

export default axleConfig.reducer;

export const { axleChanged } = axleConfig.actions;
