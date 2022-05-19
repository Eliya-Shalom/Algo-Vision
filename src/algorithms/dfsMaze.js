import { boundaryWallsReset, gridChanged } from "../store/board";
import { runtimeChanged } from "../store/runtime";

let dispatch, grid;
export default function dfsMaze(
  dispatchAction,
  tableGrid,
  mazeWallColor,
  instantMode = false
) {
  dispatch = dispatchAction;
  grid = tableGrid;

  let currentCell = grid[0][0];

  const visitedNodes = [currentCell];
  const stack = [currentCell];

  currentCell.visitedMaze = true;

  while (stack.length) {
    const nextCell = getNeighbor(currentCell, grid);

    if (nextCell) {
      visitedNodes.push(nextCell);
      stack.push(nextCell);
      nextCell.visitedMaze = true;
      removeWalls(currentCell, nextCell);
      currentCell = nextCell;
    } else {
      currentCell = stack.pop();
    }
  }

  const newStartNode = grid[window.startNode.row][window.startNode.col];
  const newFinishNode = grid[window.finishNode.row][window.finishNode.col];
  window.startNode = newStartNode;
  window.finishNode = newFinishNode;

  dispatch(gridChanged(grid));
  dispatch(boundaryWallsReset());

  if (instantMode) return instantMaze(visitedNodes, mazeWallColor);

  animateMaze(visitedNodes, mazeWallColor);
}

function animateMaze(visitedNodes, mazeWallColor) {
  dispatch(runtimeChanged({ att: "isMazeRunning", val: true }));

  let i = 0;
  const inter = setInterval(() => {
    if (i === visitedNodes.length - 1) {
      dispatch(runtimeChanged({ att: "isMazeRunning", val: false }));
      return clearInterval(inter);
    }
    paintMazeWalls(visitedNodes[i++], mazeWallColor);
  }, 1);
}

function instantMaze(visitedNodes, mazeWallColor) {
  for (const node of visitedNodes) paintMazeWalls(node, mazeWallColor);
}

export function paintMazeWalls({ id, walls }, mazeWallColor) {
  const nodeEle = document.getElementById(id);

  if (nodeEle.className === "start" || nodeEle.className === "finish") return;

  for (const side of Object.keys(walls)) {
    if (walls[side]) {
      const borderSide = `border${side[0].toUpperCase() + side.slice(1)}`;
      nodeEle.style[borderSide] = `5px solid${mazeWallColor}`;
    }
  }
}

function getNeighbor(node, grid) {
  const { row, col } = node;
  const neighbors = [];

  const top = row > 0 ? grid[row - 1][col] : false;
  const right = col + 1 < grid[0].length ? grid[row][col + 1] : false;
  const bottom = row + 1 < grid.length ? grid[row + 1][col] : false;
  const left = col - 1 >= 0 ? grid[row][col - 1] : false;

  if (top && !top.visitedMaze) neighbors.push(top);
  if (right && !right.visitedMaze) neighbors.push(right);
  if (bottom && !bottom.visitedMaze) neighbors.push(bottom);
  if (left && !left.visitedMaze) neighbors.push(left);

  if (neighbors.length) {
    const randomIdx = Math.floor(Math.random() * neighbors.length);
    return neighbors[randomIdx];
  } else return false;
}

function removeWalls(currentCell, nextCell) {
  if (currentCell.col < nextCell.col) {
    currentCell.walls.right = false;
    nextCell.walls.left = false;
  } else if (currentCell.col > nextCell.col) {
    currentCell.walls.left = false;
    nextCell.walls.right = false;
  }

  if (currentCell.row < nextCell.row) {
    currentCell.walls.bottom = false;
    nextCell.walls.top = false;
  } else if (currentCell.row > nextCell.row) {
    currentCell.walls.top = false;
    nextCell.walls.bottom = false;
  }
}
