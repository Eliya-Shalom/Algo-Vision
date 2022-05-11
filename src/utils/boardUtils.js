import { batch } from "react-redux";
import { gridChanged, gridInitialized, removeMidways } from "../store/board";
import { runtimeChanged } from "../store/runtime";
import { getRandomInt } from "./commonUtils";

function createNode(row, col) {
  return {
    id: `node-${row}-${col}`,
    row,
    col,
    visitedDFS: false,
    visitedBFS: false,
    visitedMaze: false,
    visitedDijkstra: false,
    distanceFromStart: Infinity,
    estimatedDistanceToEnd: Infinity,
    walls: { top: true, right: true, bottom: true, left: true },
    isWall: false,
    isMidway: false,
    prevNode: null,
    weight: 1,
    isStart: false,
    isFinish: false,
  };
}

function createGrid(rows, cols) {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    grid.push([]);
    for (let col = 0; col < cols; col++) {
      const node = createNode(row, col);

      const boundaryWall = row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
      if (boundaryWall) node.isWall = true;

      grid[row].push(node);
    }
  }
  return grid;
}

export const initializeGrid = (height, width, nodeSize, dispatch) => {
  let currentHeight = height;
  let currentWidth = width;

  const rows = Math.floor(currentHeight / nodeSize);
  const cols = Math.floor(currentWidth / nodeSize);

  const initGrid = createGrid(rows, cols);

  window.startNode = { ...initGrid[2][2] };
  window.finishNode = { ...initGrid[rows - 3][cols - 3] };

  initGrid[2][2].isStart = true;
  initGrid[rows - 3][cols - 3].isFinish = true;

  dispatch(gridInitialized(initGrid));
};

export function copyGrid(grid) {
  return grid.map((row) =>
    row.map((node) => {
      return { ...node, walls: { ...node.walls } };
    })
  );
}

export function cleanPaint(nodes, className, idx = 0) {
  if (idx < 0) return;
  for (let i = idx; i < nodes.length; i++) {
    const node = nodes[i];
    if (isStartOrFinish(node) || node.isWall) continue;
    document.getElementById(node.id).className = className;
  }
}

export function paintNodes(nodes, className) {
  for (const { row, col, id } of nodes) {
    if (isStartOrFinish({ row, col })) continue;
    document.getElementById(id).className = className;
  }
}

export function paintNode({ row, col, id }, className) {
  if (isStartOrFinish({ row, col })) return;
  document.getElementById(id).className = className;
}

export function isStartOrFinish({ row, col }) {
  return (
    (row === window.startNode.row && col === window.startNode.col) ||
    (row === window.finishNode.row && col === window.finishNode.col)
  );
}

export function isPath(id) {
  const nodeEle = document.getElementById(id);
  if (!nodeEle) return;
  const className = nodeEle.className;
  return className === "chase" || className === "path" || className === "visited";
}

export function setPathProgressBarValue(visitedIdx, pathIdx = 0) {
  const progressEle = document.getElementById("progress-path");
  if (!progressEle) return;
  progressEle.value = visitedIdx + pathIdx;
}

export function cleanAndResetGrid(grid, dispatch) {
  const newGrid = [];
  for (let row = 0; row < grid.length; row++) {
    newGrid.push([]);
    for (let col = 0; col < grid[row].length; col++) {
      const prevNode = grid[row][col];
      if (!prevNode.isStart && !prevNode.isFinish && !prevNode.isWall)
        document.getElementById(prevNode.id).className = "node";

      const newNode = createNode(row, col, grid.length, grid[0].length);
      cleanMazeWalls(newNode);
      newNode.isWall = isBoundryWalls(row, col, grid);
      newNode.isStart = row === window.startNode.row && col === window.startNode.col;
      newNode.isFinish = row === window.finishNode.row && col === window.finishNode.col;

      newGrid[row].push(newNode);
    }
  }
  batch(() => {
    dispatch(gridChanged(newGrid));
    dispatch(removeMidways());
  });
}

export function cleanPrevAlgo(grid, dispatch) {
  for (const { id, isStart, isFinish, isWall } of grid.flat(1)) {
    if (!isStart && !isFinish && !isWall) document.getElementById(id).className = "node";
  }
  batch(() => {
    dispatch(runtimeChanged({ att: "midwayActive", val: false }));
    dispatch(removeMidways());
  });
}

export function cleanNode(node, grid) {
  if (isBoundryWalls(node.row, node.col, grid)) node.isWall = true;
}

function isBoundryWalls(row, col, grid) {
  return row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1;
}

export function cleanMazeWalls({ id }) {
  document.getElementById(id).style.border = "0px";
}

export function weightGrid(grid, dispatch) {
  const gridCopy = copyGrid(grid);
  for (const node of gridCopy.flat(1)) {
    node.weight = Math.floor(getRandomInt(2, 50));
  }
  dispatch(gridChanged(gridCopy));
}
