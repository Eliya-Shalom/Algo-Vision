import { createSlice } from "@reduxjs/toolkit";

const runtimeConfig = createSlice({
  name: "runtime",
  initialState: {
    pause: false,
    abort: false,
    isDone: false,
    isMaze: false,
    isSorted: false,
    isPainted: false,
    isRunning: false,
    isShuffling: false,
    dynamicMode: false,
    midwayActive: false,
    isMazeRunning: false,
    mouseChaseActive: false,
    instantMode: false,
    runningFunc: { algo: "", type: "", category: "" },
    snapshot: {
      path: { visited: [], path: [], indices: [0, 0] },
      sort: { swaps: [], idx: 0 },
    },
    dynamicSnapshot: { heap: [], nodesIdsToIndicesMap: {} },
  },
  reducers: {
    runtimeChanged: (state, { payload }) => {
      const { att, val } = payload;
      state[att] = val;
    },
    snapshotTook: (state, { payload }) => {
      const { category, val } = payload;
      console.log(val);
      for (const att of Object.keys(val)) state.snapshot[category][att] = val[att];
    },
    indicesChanged: (state, { payload }) => {
      const { category, val } = payload;
      state.snapshot[category].indices = val;
    },
    visualizingPlayed: (state) => {
      state.isRunning = true;
      state.isSorted = false;
      state.isPainted = true;
      state.isDone = false;
      state.pause = false;
      state.abort = false;
    },
    visualizingPaused: (state) => {
      state.isRunning = false;
      state.pause = true;
    },
    visualizingAborted: (state) => {
      state.abort = true;
      state.isDone = false;
      state.isSorted = false;
      state.isRunning = false;
      state.isPainted = false;
      state.realtime = "0.000";
      state.distance = 0;
      state.snapshot = {
        path: { visited: [], path: [], indices: [0, 0] },
        sort: { swaps: [], idx: 0 },
      };
      state.dynamicSnapshot = { heap: [], nodesIdsToIndicesMap: {} };
      window.snapshot.path = { visited: [], path: [], indices: [0, 0] };
    },
    visualizingDone: (state) => {
      state.isRunning = false;
      state.isSorted = true;
      state.isDone = true;
    },
    dynamicSnapshotTook(state, { payload }) {
      const { heap, nodesIdsToIndicesMap } = payload;
      state.dynamicSnapshot = { heap, nodesIdsToIndicesMap };
    },
  },
});

export default runtimeConfig.reducer;

export const {
  snapshotTook,
  swapsChanged,
  runtimeChanged,
  indicesChanged,
  visualizingDone,
  visualizingPlayed,
  visualizingPaused,
  visualizingAborted,
  dynamicSnapshotTook,
} = runtimeConfig.actions;
