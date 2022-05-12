let ops;
export default function aStar(grid, startNode, finishNode, HEURISTIC, isMaze) {
  ops = 0;
  let start = performance.now();
  const { row: fRow, col: fCol } = finishNode;

  const visitedNodes = [];

  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = calculateHeuristic(startNode, finishNode, HEURISTIC);

  const nodesToVisit = new MinHeap([startNode]);

  while (!nodesToVisit.isEmpty()) {
    ops++;

    const currentNodeWithMinimumF = nodesToVisit.remove();
    visitedNodes.push(currentNodeWithMinimumF);

    const { row, col } = currentNodeWithMinimumF;

    if (row === fRow && col === fCol) {
      finishNode.prevNode = currentNodeWithMinimumF;
      break;
    }

    const neighbors = getNodeNeighbors(currentNodeWithMinimumF, grid, HEURISTIC, isMaze);

    for (const neighbor of neighbors) {
      ops++;
      if (neighbor.isWall) continue;

      const neighborTentativeG =
        currentNodeWithMinimumF.distanceFromStart + neighbor.weight;

      if (neighborTentativeG >= neighbor.distanceFromStart) continue;

      neighbor.prevNode = currentNodeWithMinimumF;
      neighbor.distanceFromStart = neighborTentativeG;
      neighbor.estimatedDistanceToEnd =
        neighborTentativeG + calculateHeuristic(neighbor, finishNode, HEURISTIC);

      if (!nodesToVisit.containsNode(neighbor)) nodesToVisit.insert(neighbor);
      else nodesToVisit.update(neighbor);
    }
  }
  const pathNodes = reconstructPath(finishNode);
  let end = performance.now();

  return [visitedNodes, pathNodes, ops, end - start];
}

function reconstructPath(finishNode) {
  if (!finishNode.prevNode) {
    return [];
  }

  const pathNodes = [];

  let currentNode = finishNode;

  while (currentNode) {
    ops++;

    pathNodes.push(currentNode);
    currentNode = currentNode.prevNode;
  }
  return pathNodes.reverse();
}

function calculateHeuristic(currentNode, finishNode, HEURISTIC) {
  if (HEURISTIC === "Manhattan")
    return calculateManhattanDistance(currentNode, finishNode);
  else if (HEURISTIC === "Diagonal")
    return calculateDiagonalDistance(currentNode, finishNode);
}

function calculateManhattanDistance(currentNode, finishNode) {
  return (
    Math.abs(currentNode.row - finishNode.row) +
    Math.abs(currentNode.col - finishNode.col)
  );
}

export function calculateDiagonalDistance(currentNode, finishNode) {
  const diagonalHeuristic = Math.min(
    Math.abs(currentNode.row - finishNode.row),
    Math.abs(currentNode.col - finishNode.col)
  );
  const manhattanHeuristic = calculateManhattanDistance(currentNode, finishNode);
  const DIAGONAL_COST = 1.414;

  return DIAGONAL_COST * diagonalHeuristic + (manhattanHeuristic - 2 * diagonalHeuristic);
}

function getNodeNeighbors(node, grid, HEURISTIC, isMaze) {
  if (HEURISTIC === "Manhattan") return getFourNeighbors(node, grid, isMaze);
  else if (HEURISTIC === "Diagonal") return getEightNeighbors(node, grid, isMaze);
}

function getFourNeighbors(node, grid, isMaze) {
  const neighbors = [];
  const { row, col, walls } = node;
  if (isMaze) {
    if (row > 0 && !walls.top) {
      ops++;
      neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1 && !walls.bottom) {
      ops++;
      neighbors.push(grid[row + 1][col]);
    }
    if (col > 0 && !walls.left) {
      ops++;
      neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1 && !walls.right) {
      ops++;
      neighbors.push(grid[row][col + 1]);
    }
  } else {
    if (row > 0) {
      ops++;
      neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
      ops++;
      neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
      ops++;
      neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
      ops++;
      neighbors.push(grid[row][col + 1]);
    }
  }

  return neighbors;
}

export function getEightNeighbors(node, grid, isMaze) {
  const fourNeighbors = getFourNeighbors(node, grid, isMaze);
  const diagonallyNeighbors = [];
  const { row, col } = node;

  if (isMaze) return fourNeighbors;

  if (row > 0 && col > 0) {
    ops++;
    diagonallyNeighbors.push(grid[row - 1][col - 1]);
  }
  if (row > 0 && col < grid[0].length - 1) {
    ops++;
    diagonallyNeighbors.push(grid[row - 1][col + 1]);
  }
  if (row < grid.length - 1 && col < grid[0].length - 1) {
    ops++;
    diagonallyNeighbors.push(grid[row + 1][col + 1]);
  }
  if (row < grid.length - 1 && col > 0) {
    ops++;
    diagonallyNeighbors.push(grid[row + 1][col - 1]);
  }

  return fourNeighbors.concat(diagonallyNeighbors);
}

export class MinHeap {
  constructor(array) {
    this.nodesIdsToIndicesMap = array.reduce((firstElement, node, nodeIdx) => {
      ops++;

      firstElement[node.id] = nodeIdx;
      return firstElement;
    }, {});
    this.heap = this.buildHeap(array);
  }
  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let i = firstParentIdx; i >= 0; i--) this.siftDown(i, array.length - 1, array);
    return array;
  }

  siftDown(parentIdx, endIdx, heap) {
    let childOneIdx = parentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      ops++;

      const childTwoIdx = childOneIdx + 1 <= endIdx ? childOneIdx + 1 : null;
      const smallerChildIdx =
        childTwoIdx &&
        heap[childTwoIdx].estimatedDistanceToEnd <
          heap[childOneIdx].estimatedDistanceToEnd
          ? childTwoIdx
          : childOneIdx;
      if (
        heap[smallerChildIdx].estimatedDistanceToEnd <
        heap[parentIdx].estimatedDistanceToEnd
      ) {
        this.swap(smallerChildIdx, parentIdx);
        parentIdx = smallerChildIdx;
        childOneIdx = parentIdx * 2 + 1;
      } else return;
    }
  }
  siftUp(childIdx, heap) {
    let parentIdx = Math.floor((childIdx - 1) / 2);
    while (
      childIdx > 0 &&
      heap[childIdx].estimatedDistanceToEnd < heap[parentIdx].estimatedDistanceToEnd
    ) {
      ops++;
      this.swap(childIdx, parentIdx);
      childIdx = parentIdx;
      parentIdx = Math.floor((childIdx - 1) / 2);
    }
  }
  remove() {
    this.swap(0, this.heap.length - 1);
    const removedNode = this.heap.pop();
    delete this.nodesIdsToIndicesMap[removedNode.id];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return removedNode;
  }
  insert(node) {
    this.heap.push(node);
    this.nodesIdsToIndicesMap[node.id] = this.heap.length - 1;

    this.siftUp(this.heap.length - 1, this.heap);
  }
  swap(i, j) {
    this.nodesIdsToIndicesMap[this.heap[i].id] = j;
    this.nodesIdsToIndicesMap[this.heap[j].id] = i;
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  containsNode(node) {
    return node.id in this.nodesIdsToIndicesMap;
  }
  update(node) {
    this.siftUp(this.nodesIdsToIndicesMap[node.id], this.heap);
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}
