import { batch } from "react-redux";
import visualizePath from "../algorithms/path-finding/visualizePath";
import { resetTimer } from "../components/layout/topbar/Timer";
import { nodeChanged } from "../store/board";
import { runtimeChanged, snapshotTook, visualizingPlayed } from "../store/runtime";
import { uiChanged } from "../store/ui";
import { cleanPrevAlgo, isPath } from "./boardUtils";

export function handleDragStart(e, row, col, dispatch) {
  e.dataTransfer.setData("text", `${row}-${col}`);
  resetTimer();
  dispatch(
    snapshotTook({
      category: "path",
      val: { visited: [], path: [], indices: [0, 0] },
    })
  );
}

export function handleDrop(
  e,
  grid,
  row,
  col,
  isWall,
  isMidway,
  isMaze,
  isPainted,
  dragged,
  dynamicMode,
  instantMode,
  runningFunc,
  snapshot,
  dispatch,
) {
  e.preventDefault();
  if (isWall || isMidway) return;

  const [prevRow, prevCol] = e.dataTransfer.getData("text").split("-");

  if (+prevRow === window.startNode.row && +prevCol === window.startNode.col) {
    window.startNode = grid[row][col];
    dispatch(uiChanged({ prop: "board", att: "dragged", val: !dragged }));
  } else if (+prevRow === window.finishNode.row && +prevCol === window.finishNode.col) {
    window.finishNode = grid[row][col];
    dispatch(uiChanged({ prop: "board", att: "dragged", val: !dragged }));
  }

  if (dynamicMode) return;

  isPainted && cleanPrevAlgo(grid);

  const { algo, type } = runningFunc;

  if (!algo || window.hasPaused || window.hasAborted) return;
  batch(() => {
    dispatch(visualizingPlayed());
    instantMode && dispatch(runtimeChanged({ att: "isRunning", val: false }));
  });

  visualizePath(algo, type, grid, snapshot.path, isMaze, dispatch, instantMode);
}

export function handleClick(
  grid,
  row,
  col,
  id,
  isWall,
  isPainted,
  midwayActive,
  targetNum,
  isUnclickable,
  dispatch,
) {
  if (!midwayActive || isUnclickable() || isWall) return;
  !isPainted && dispatch(runtimeChanged({ att: "isPainted", val: true }));
  document.getElementById(id).appendChild(document.createTextNode(`${++targetNum}`));
  dispatch(nodeChanged({ row, col, change: "midway" }));
  window.targets.push({ ...grid[row][col] });
}

export function handleChaseMouseEnter(
  isWall,
  id,
  isDone,
  grid,
  row,
  col,
  midwayActive,
  isUnclickable
) {
  if (isUnclickable() || isWall || isPath({ id }) || isDone) return;
  document.getElementById(window.finishNode.id).className = "node";
  window.finishNode = grid[row][col];
  document.getElementById(window.finishNode.id).className = "finish";
  if (!window.targets.length || !midwayActive) return;
  const { id: tId } = window.targets[window.targets.length - 1];
  document.getElementById(tId).className = "midway";
}

export function handleWallMouseEnter(
  mousePressedWall,
  isRunning,
  dynamicMode,
  row,
  col,
  dispatch,
  isUnclickable
) {
  if (isUnclickable() || !mousePressedWall || (isRunning && !dynamicMode)) return;
  dispatch(nodeChanged({ row, col, change: "wall" }));
}

export function handleMouseDown(
  { button },
  midwayActive,
  mouseChaseActive,
  isRunning,
  dynamicMode,
  dispatch,
  onChase,
  row,
  col,
  setDraggable,
  isUnclickable,
  isStart,
  isFinish
) {
  if (button === 1) return;
  setDraggable((isStart || isFinish) && !mouseChaseActive);
  if (isUnclickable() || midwayActive || (isRunning && !dynamicMode)) return;
  dispatch(uiChanged({ prop: "board", att: "mousePressedWall", val: true }));
  if (mouseChaseActive) {
    dispatch(runtimeChanged({ att: "mouseChaseActive", val: false }));
    onChase = true;
  }
  dispatch(nodeChanged({ row, col, change: "wall" }));
}

export function handleMouseUp(
  { button },
  mouseChaseActive,
  midwayActive,
  isRunning,
  dynamicMode,
  isPainted,
  dispatch,
  onChase,
  setDraggable,
  isStart,
  isFinish
) {
  if (button === 1) return;
  setDraggable(isStart || isFinish);
  if (mouseChaseActive || midwayActive || (isRunning && !dynamicMode)) return;
  !isPainted && dispatch(runtimeChanged({ att: "isPainted", val: true }));
  dispatch(uiChanged({ prop: "board", att: "mousePressedWall", val: false }));
  onChase && dispatch(runtimeChanged({ att: "mouseChaseActive", val: true }));
  onChase = false;
}

export function handleAuxClick(row, col, dispatch) {
  dispatch(nodeChanged({ row, col, change: "weight" }));
}
