import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./board";
import runtimeReducer from "./runtime";
import axleReducer from "./axle";
import uiReducer from "./ui";

export default combineReducers({
  board: boardReducer,
  axle: axleReducer,
  runtime: runtimeReducer,
  ui: uiReducer,
});
