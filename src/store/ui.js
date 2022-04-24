import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
  name: "UI",
  initialState: {
    dragged: false,
    isSnippetOpen: false,
    mousePressedWall: false,
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
