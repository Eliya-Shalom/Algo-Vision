import { gridChanged, gridInitialized } from "../store/board";

function createNode(row, col, rows, cols) {
  return {
    id: `node-${row}-${col}`,
    row,
    col,
    walls: { top: true, right: true, bottom: true, left: true },
    isWall: false,
    visitedMaze: false,
    visitedDijkstra: false,
    visitedDFS: false,
    visitedBFS: false,
    stacked: false,
    prevNode: null,
    distanceFromStart: Infinity,
    estimatedDistanceToEnd: Infinity,
    isStart: row === 2 && col === 2,
    isFinish: row === rows - 3 && col === cols - 3,
  };
}

function createGrid(rows, cols) {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    grid.push([]);
    for (let col = 0; col < cols; col++) {
      grid[row].push(createNode(row, col, rows, cols));
    }
  }
  return grid;
}

export const generateGrid = (height, width, nodeSize, dispatch) => {
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
    if (isStartOrFinish(node) || isWall(node)) continue;
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

export function isWall(id) {
  const nodeEle = document.getElementById(id);
  if (!nodeEle) return;
  return nodeEle.className === "wall";
}

export function isMidway(id) {
  const nodeEle = document.getElementById(id);
  if (!nodeEle) return;
  return nodeEle.className === "midway";
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
      const isStart = row === startNode.row && col === startNode.col;
      const isFinish = row === finishNode.row && col === finishNode.col;
      const node = grid[row][col];

      if (!cleanPaintOnly) {
        const newNode = { ...grid[row][col] };

        newNode.prevNode = null;
        newNode.distanceFromStart = Infinity;
        newNode.estimatedDistanceToEnd = Infinity;
        newNode.visitedMaze = false;
        newNode.visitedDijkstra = false;
        newNode.visitedDFS = false;
        newNode.visitedBFS = false;
        newNode.isStart = isStart;
        newNode.isFinish = isFinish;

        if (newNode.isStart) window.startNode = newNode;
        if (newNode.isFinish) window.finishNode = newNode;

        if (cleanMaze) cleanNodeMazeWalls(newNode, grid);

        newGrid[row].push(newNode);
      }

      if (!isStart && !isFinish) cleanNode(node, grid, cleanWalls, cleanMaze);
    }
  }
  if (dynamicMode) removeMidways(isBorders);
  !cleanPaintOnly && dispatch(gridChanged(newGrid));
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

export function cleanNode({ row, col, id }, grid, cleanWalls, cleanMaze) {
  const nodeEle = document.getElementById(id);
  if (isBoundryWalls(row, col, grid) && cleanMaze) nodeEle.className = "wall";
  else {
    if (isWall(id) && !cleanWalls) return;
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

export function setWall(id, overrideWalls = true) {
  const nodeEle = document.getElementById(id);

  const isWall = nodeEle.className === "wall";
  if (isWall && overrideWalls) nodeEle.className = "node";
  else nodeEle.className = "wall";
}
