import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
  name: "UI",
  initialState: {
    dragged: false,
    isSnippetOpen: false,
    mousePressedWall: false,
    distance: "0",
    realtime: "0.000",
    opsCounter: "0",
    swapsCounter: 0,
    visitedCounter: 0,
  },
  reducers: {
    uiChanged: (state, { payload }) => {
      const { att, val } = payload;
      state[att] = val;
    },
  },
});

export default ui.reducer;

export const { uiChanged } = ui.actions;
