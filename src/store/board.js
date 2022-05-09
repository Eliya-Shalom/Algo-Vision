import { createSlice } from "@reduxjs/toolkit";

const boardConfig = createSlice({
  name: "board",
  initialState: {
    dimensions: {
      height: null,
      width: null,
      maxHeight: null,
      maxWidth: null,
      nodeSize: 35,
    },
    grid: [],
  },
  reducers: {
    boardChanged: (state, { payload }) => {
      const { prop, att, val } = payload;
      state[prop][att] = val;
    },
    dimensionsChanged: (state, { payload }) => {
      const { att, val } = payload;
      state.dimensions[att] = val;
    },
    boardResized: (state, { payload }) => {
      const { height, width, maxWidth } = payload;
      state.dimensions.width = width;
      state.dimensions.maxWidth = maxWidth;
      state.dimensions.height = height;
      state.dimensions.maxHeight = height;
    },
    gridChanged: (state, { payload }) => {
      state.grid = payload;
    },
    gridInitialized: (state, { payload }) => {
      state.grid = payload;
    },
    nodeChanged: (state, { payload }) => {
      const { row, col, att, val } = payload;
      state.grid[row][col][att] = val;
    },
    boundryWallsReset: (state) => {
      state.grid[0].map((node) => (node.isWall = false));
      state.grid[state.grid.length - 1].map((node) => (node.isWall = false));
      for (let i = 1; i < state.grid.length - 1; i++) {
        state.grid[i][0].isWall = false;
        state.grid[i][state.grid[i].length - 1].isWall = false;
      }
    },
    boardDimensionsReset: (state) => {
      state.dimensions = {
        ...state.dimensions,
        height: state.dimensions.maxHeight,
        width: state.dimensions.maxWidth,
        nodeSize: 35,
      };
    },
    removeMidways: (state) => {
      if (!window.targets.length) return;

      for (const { row, col, id } of window.targets) {
        state.grid[row][col].isMidway = false;
        const nodeEle = document.getElementById(id);
        nodeEle.removeChild(nodeEle.firstChild);
      }
      window.targets = [];
    },
  },
});

export default boardConfig.reducer;

export const {
  boardResized,
  boardChanged,
  nodeChanged,
  gridChanged,
  tableChanged,
  dimensionsChanged,
  gridInitialized,
  boardDimensionsReset,
  boundryWallsReset,
  removeMidways,
} = boardConfig.actions;
