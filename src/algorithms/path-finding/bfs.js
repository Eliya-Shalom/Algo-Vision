let ops;

export default function breadthFirstSearch(grid, startNode, finishNode, isMaze) {
  ops = 0;
  let start = performance.now();

  const visitedNodes = [];
  let queue = [startNode];

  startNode.visitedBFS = true;
  startNode.distanceFromStart = 0;
  let found = false;

  while (queue.length && !found) {
    ops++;
    const currentNode = queue.shift();
    visitedNodes.push(currentNode);

    const neighbors = getUnvisitedNeighbors(currentNode, grid, isMaze);

    for (const neighbor of neighbors) {
      ops++;
      neighbor.visitedBFS = true;
      neighbor.distanceFromStart = currentNode.distanceFromStart + neighbor.weight;
      neighbor.prevNode = currentNode;

      const { row, col } = neighbor;
      const { row: fRow, col: fCol } = finishNode;

      if (row === fRow && col === fCol) {
        finishNode.prevNode = currentNode;
        found = true;
        break;
      } else queue.push(neighbor);
    }
  }
  const pathNodes = reconstructPath(finishNode);

  let end = performance.now();

  return [visitedNodes, pathNodes, ops, end - start];
}

function getUnvisitedNeighbors(node, grid, isMaze) {
  const neighbors = [];
  const { row, col, walls } = node;

  if (isMaze) {
    if (row < grid.length - 1 && !walls.bottom) {
      ops++;
      const nodeAtBottom = grid[row + 1][col];
      if (!nodeAtBottom.visitedBFS && !nodeAtBottom.isWall) neighbors.push(nodeAtBottom);
    }
    if (col < grid[0].length - 1 && !walls.right) {
      ops++;
      const nodeAtRight = grid[row][col + 1];
      if (!nodeAtRight.visitedBFS && !nodeAtRight.isWall) neighbors.push(nodeAtRight);
    }
    if (row > 0 && !walls.top) {
      ops++;
      const nodeAtTop = grid[row - 1][col];
      if (!nodeAtTop.visitedBFS && !nodeAtTop.isWall) neighbors.push(nodeAtTop);
    }
    if (col > 0 && !walls.left) {
      ops++;
      const nodeAtLeft = grid[row][col - 1];
      if (!nodeAtLeft.visitedBFS && !nodeAtLeft.isWall) neighbors.push(nodeAtLeft);
    }
  } else {
    if (row < grid.length - 1) {
      ops++;
      const nodeAtBottom = grid[row + 1][col];
      if (!nodeAtBottom.visitedBFS && !nodeAtBottom.isWall) neighbors.push(nodeAtBottom);
    }
    if (col < grid[0].length - 1) {
      ops++;
      const nodeAtRight = grid[row][col + 1];
      if (!nodeAtRight.visitedBFS && !nodeAtRight.isWall) neighbors.push(nodeAtRight);
    }
    if (row > 0) {
      ops++;
      const nodeAtTop = grid[row - 1][col];
      if (!nodeAtTop.visitedBFS && !nodeAtTop.isWall) neighbors.push(nodeAtTop);
    }
    if (col > 0) {
      ops++;
      const nodeAtLeft = grid[row][col - 1];
      if (!nodeAtLeft.visitedBFS && !nodeAtLeft.isWall) neighbors.push(nodeAtLeft);
    }
  }
  return neighbors;
}

function reconstructPath(finishNode) {
  if (!finishNode.prevNode) return [];
  const pathNodes = [];
  let currentNode = finishNode;
  while (currentNode) {
    pathNodes.push(currentNode);
    currentNode = currentNode.prevNode;
  }
  return pathNodes.reverse();
}
