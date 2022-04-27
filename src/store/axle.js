import { createSlice } from "@reduxjs/toolkit";

const axleConfig = createSlice({
  name: "axle",
  initialState: {
    axle: [],
    numOfBars: 100,
    align: "flex-end",
    transition: true,
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
