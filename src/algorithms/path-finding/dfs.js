import { isWall } from "../../utils/boardUtils";
let ops;

export default function depthFirstSearch(grid, startNode, finishNode, isMaze) {
  ops = 0;
  let start = performance.now();

  const visitedNodes = [startNode];
  const stack = [startNode];

  startNode.visitedDFS = true;
  startNode.distanceFromStart = 0;

  let currentNode = startNode;

  while (stack.length) {
    ops++;

    const nextNode = getNeighbor(currentNode, grid, isMaze);
    if (nextNode) {
      visitedNodes.push(nextNode);
      stack.push(nextNode);

      nextNode.visitedDFS = true;
      nextNode.distanceFromStart = currentNode.distanceFromStart + 1;
      nextNode.prevNode = currentNode;

      const { row, col } = nextNode;
      const { row: fRow, col: fCol } = finishNode;
      if (row === fRow && col === fCol) {
        finishNode.prevNode = currentNode;
        break;
      }

      currentNode = nextNode;
    } else {
      currentNode = stack.pop();
    }
  }
  const pathNodes = reconstructPath(finishNode);

  let end = performance.now();

  return [visitedNodes, pathNodes, ops, end - start];
}

function getNeighbor(node, grid, isMaze) {
  const { row, col, walls } = node;

  if (isMaze) {
    if (row < grid.length - 1 && !walls.bottom) {
      ops++;
      const nodeAtBottom = grid[row + 1][col];
      if (!nodeAtBottom.visitedDFS && !isWall(nodeAtBottom.id)) return nodeAtBottom;
    }
    if (col < grid[0].length - 1 && !walls.right) {
      ops++;
      const nodeAtRight = grid[row][col + 1];
      if (!nodeAtRight.visitedDFS && !isWall(nodeAtRight.id)) return nodeAtRight;
    }
    if (row > 0 && !walls.top) {
      ops++;
      const nodeAtTop = grid[row - 1][col];
      if (!nodeAtTop.visitedDFS && !isWall(nodeAtTop.id)) return nodeAtTop;
    }
    if (col > 0 && !walls.left) {
      ops++;
      const nodeAtLeft = grid[row][col - 1];
      if (!nodeAtLeft.visitedDFS && !isWall(nodeAtLeft.id)) return nodeAtLeft;
    }
  } else {
    if (row < grid.length - 1) {
      ops++;
      const nodeAtBottom = grid[row + 1][col];
      if (!nodeAtBottom.visitedDFS && !isWall(nodeAtBottom.id)) return nodeAtBottom;
    }
    if (col < grid[0].length - 1) {
      ops++;
      const nodeAtRight = grid[row][col + 1];
      if (!nodeAtRight.visitedDFS && !isWall(nodeAtRight.id)) return nodeAtRight;
    }
    if (row > 0) {
      ops++;
      const nodeAtTop = grid[row - 1][col];
      if (!nodeAtTop.visitedDFS && !isWall(nodeAtTop.id)) return nodeAtTop;
    }
    if (col > 0) {
      ops++;
      const nodeAtLeft = grid[row][col - 1];
      if (!nodeAtLeft.visitedDFS && !isWall(nodeAtLeft.id)) return nodeAtLeft;
    }
  }
  return false;
}

function reconstructPath(finishNode) {
  if (!finishNode.prevNode) return [];

  const pathNodes = [];
  let currentNode = finishNode;
  while (currentNode) {
    ops++;
    pathNodes.push(currentNode);
    currentNode = currentNode.prevNode;
  }
  return pathNodes.reverse();
}
