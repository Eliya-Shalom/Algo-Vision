import { createSlice } from "@reduxjs/toolkit";

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

const ui = createSlice({
  name: "UI",
  initialState: {
    colorMode: "light",
    isMobile,
    screen: {
      orientation: "portrait",
    },
    board: {
      isDragging: false,
      isBorders: true,
      mousePressedWall: false,
    },
    topBar: {
      distance: 0,
      opsCounter: 0,
      swapsCounter: 0,
      visitedCounter: 0,
      realtime: "0.000",
      height: isMobile ? 60 : 85,
      overflow: "auto",
      progressBarMax: 0,
    },
    sideMenu: {
      width: isMobile ? 60 : 250,
      open: !isMobile,
    },
    snippet: {
      open: false,
    },
    visualPanel: {
      panelHeight: isMobile ? 35 : 50,
      drawerHeight: isMobile ? 150 : 214,
      isReset: false,
    },
    tutorial: {
      open: false,
      done: false,
    },
    threeD: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 0.9,
      perspective: 2500,
    },
  },
  reducers: {
    uiChanged: (state, { payload }) => {
      const { prop, att, val } = payload;
      if (!prop) state[att] = val;
      else state[prop][att] = val;
    },
    visualSettingsReset: (state, { payload }) => {
      state.threeD = {
        perspective: 2500,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        isBorders: true,
      };
      state.visualPanel.isReset = !state.visualPanel.isReset;
    },
  },
});

export default ui.reducer;

export const { uiChanged, visualSettingsReset } = ui.actions;
