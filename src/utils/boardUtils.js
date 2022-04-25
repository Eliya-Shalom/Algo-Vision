import { gridChanged, gridInitialized } from "../store/board";
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

export function setPathProgressBarMax(visited, path) {
  const progressEle = document.getElementById("progress-path");
  if (!progressEle) return;
  progressEle.max = visited.length - 1 + path.length - 1;
}

export function getProgressBarValue() {
  const progressEle = document.getElementById("progress-path");
  if (!progressEle) return;
  return [+progressEle.value, +progressEle.max];
}

export function cleanAndResetGrid(dispatch, grid) {
  cleanPrevAlgo(grid);

  const newGrid = [];
  for (let row = 0; row < grid.length; row++) {
    newGrid.push([]);
    for (let col = 0; col < grid[row].length; col++) {
      const node = createNode(row, col, grid.length, grid[0].length);
      cleanMazeWalls(node);
      if (isBoundryWalls(row, col, grid)) node.isWall = true;
      newGrid[row].push(node);
    }
  }
  removeMidways(newGrid);
  dispatch(gridChanged(newGrid));
}

export function cleanPrevAlgo(grid) {
  const { startNode, finishNode } = window;

  for (const node of grid.flat(1)) {
    const isStart = node.row === startNode.row && node.col === startNode.col;
    const isFinish = node.row === finishNode.row && node.col === finishNode.col;
    if (!isStart && !isFinish && !node.isWall)
      document.getElementById(node.id).className = "node";
  }
}

function removeMidways(grid) {
  if (!window.targets.length) return;

  for (const { row, col, id } of window.targets) {
    grid[row][col].isMidway = false;
    const nodeEle = document.getElementById(id);
    nodeEle.removeChild(nodeEle.firstChild);
  }
  window.targets = [];
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
