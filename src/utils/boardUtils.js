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
      grid[row].push(createNode(row, col));
      const boundaryWall = row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
      if (boundaryWall) grid[row][col].isWall = true;
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
    const nodeEle = document.getElementById(node.id);
    nodeEle.className = className;
  }
}

export function paintNodes(nodes, className) {
  for (const node of nodes) {
    const nodeEle = document.getElementById(node.id);
    if (isStartOrFinish(node)) continue;
    nodeEle.className = className;
  }
}

export function paintNode({ row, col, id }, className) {
  if (isStartOrFinish({ row, col })) return;

  const nodeEle = document.getElementById(id);
  if (!nodeEle) return;
  nodeEle.className = className;
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

export function cleanAndResetGrid(
  dispatch,
  grid,
  cleanPaintOnly = false,
  cleanWalls = true,
  cleanMaze = true,
  dynamicMode = false,
  isBorders = true
) {
  const newGrid = [];
  const { startNode, finishNode } = window;
  for (let row = 0; row < grid.length; row++) {
    newGrid.push([]);
    for (let col = 0; col < grid[row].length; col++) {
      const node = createNode(row, col, grid.length, grid[0].length);

      const isStart = row === startNode.row && col === startNode.col;
      const isFinish = row === finishNode.row && col === finishNode.col;

      if (node.isStart) window.startNode = node;
      if (node.isFinish) window.finishNode = node;

      if (cleanMaze) cleanNodeMazeWalls(node, grid);
      if (!isStart && !isFinish) cleanNode(node, grid, cleanWalls, cleanMaze);

      newGrid[row].push(node);
    }
  }
  if (dynamicMode) removeMidways(isBorders);
  if (!cleanPaintOnly) dispatch(gridChanged(newGrid));
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

function removeMidways(isBorders) {
  for (const { id } of window.targets) {
    const nodeEle = document.getElementById(id);
    nodeEle.removeChild(nodeEle.firstChild);
    nodeEle.className = "node";
    if (isBorders) nodeEle.style.outline = "0.5px solid #e0e0e0";
  }
  window.targets = [];
}

export function cleanNode(node, grid, cleanWalls, cleanMaze) {
  const { row, col, id, isWall } = node;
  const nodeEle = document.getElementById(id);
  if (isBoundryWalls(row, col, grid) && cleanMaze) nodeEle.className = "wall";
  else {
    if (isWall && !cleanWalls) return;
    nodeEle.className = "node";
  }
}

function isBoundryWalls(row, col, grid) {
  return row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1;
}

export function cleanNodeMazeWalls(node) {
  node.walls = { top: true, right: true, bottom: true, left: true };
  const nodeEle = document.getElementById(node.id);
  nodeEle.style.border = "0px";
}

export function weightGrid(grid, dispatch) {
  const gridCopy = copyGrid(grid);
  for (const node of gridCopy.flat(1)) {
    node.weight = Math.floor(getRandomInt(2, 50));
  }
  dispatch(gridChanged(gridCopy));
}
