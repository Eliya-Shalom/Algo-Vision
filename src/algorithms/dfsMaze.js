export default function dfsMaze(grid, setGrid, setIsMazeRunning, instantMode = false) {
  let currentCell = grid[0][0];

  const visitedNodes = [currentCell];
  const stack = [currentCell];

  currentCell.visitedMaze = true;
  currentCell.stacked = true;

  while (stack.length) {
    const nextCell = getNeighbor(currentCell, grid);

    if (nextCell) {
      visitedNodes.push(nextCell);
      stack.push(nextCell);

      nextCell.stacked = true;
      nextCell.visitedMaze = true;

      removeWalls(currentCell, nextCell);

      currentCell = nextCell;
    } else {
      currentCell = stack.pop();
      currentCell.stacked = false;
    }
  }

  const newStartNode = grid[window.startNode.row][window.startNode.col];
  const newFinishNode = grid[window.finishNode.row][window.finishNode.col];
  window.startNode = newStartNode;
  window.finishNode = newFinishNode;

  setGrid(grid);

  if (instantMode) return instantMaze(visitedNodes);

  // let i = 0;
  // let animMaze = window.requestAnimationFrame(() =>
  //   animateMaze(i, animMaze, visitedNodes, setIsMazeRunning)
  // );
  animateMaze(visitedNodes, setIsMazeRunning);
}

function animateMaze(visitedNodes, setIsMazeRunning) {
  let i = 0;
  const inter = setInterval(() => {
    if (i === visitedNodes.length - 1) {
      setIsMazeRunning(false);
      return clearInterval(inter);
    }
    paintMazeWalls(visitedNodes[i++]);
  }, 1);
}

// function animateMaze(i, animMaze, visitedNodes, setIsMazeRunning) {
//   if (i === visitedNodes.length - 1) {
//     setIsMazeRunning(false);
//     return window.cancelAnimationFrame(animMaze);
//   }
//   paintMazeWalls(visitedNodes[i++]);
//   animMaze = window.requestAnimationFrame(() =>
//     animateMaze(i, animMaze, visitedNodes, setIsMazeRunning)
//   );
// }

function instantMaze(visitedNodes) {
  for (const node of visitedNodes) paintMazeWalls(node);
}

export function paintMazeWalls({ row, col, id, walls }) {
  const nodeEle = document.getElementById(id);
  const isStart = row === window.startNode.row && col === window.startNode.col;
  const isFinish = row === window.finishNode.row && col === window.finishNode.col;

  if (!isStart && !isFinish) nodeEle.className = "node";

  if (walls.top) nodeEle.style.borderTop = "4px solid #4f477e";
  if (walls.right) nodeEle.style.borderRight = "4px solid #4f477e";
  if (walls.bottom) nodeEle.style.borderBottom = "4px solid #4f477e";
  if (walls.left) nodeEle.style.borderLeft = "4px solid #4f477e";
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
