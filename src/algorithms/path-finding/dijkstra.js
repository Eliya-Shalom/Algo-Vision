let ops;

export default function dijkstra(grid, startNode, finishNode, isMaze) {
  ops = 0;
  let start = performance.now();

  const visitedNodes = [];
  grid[startNode.row][startNode.col].distanceFromStart = 0;
  const allNodes = grid.flat(1);
  ops += allNodes.length;

  const minDistancesHeap = new MinHeap(allNodes);

  while (!minDistancesHeap.isEmpty()) {
    ops++;
    const closestNode = minDistancesHeap.remove();
    if (closestNode.isWall) continue;

    if (closestNode.distanceFromStart === Infinity) break;

    closestNode.visitedDijkstra = true;
    visitedNodes.push(closestNode);

    const { row, col } = closestNode;
    const { row: fRow, col: fCol } = finishNode;
    if (row === fRow && col === fCol) {
      finishNode.prevNode = closestNode;
      break;
    }

    const neighbors = getUnvisitedNeighbors(closestNode, grid, isMaze);
    for (const neighbor of neighbors) {
      ops++;
      if (neighbor.isWall) continue;

      neighbor.distanceFromStart = closestNode.distanceFromStart + neighbor.weight;
      neighbor.prevNode = closestNode;

      minDistancesHeap.update(neighbor, neighbor.distanceFromStart);
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
    if (row > 0 && !walls.top) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && !walls.bottom) neighbors.push(grid[row + 1][col]);
    if (col > 0 && !walls.left) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && !walls.right) neighbors.push(grid[row][col + 1]);
  } else {
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  }

  return neighbors.filter((neighbor) => !neighbor.visitedDijkstra);
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

class MinHeap {
  constructor(array) {
    this.vertexMap = array.reduce((mapObj, node, i) => {
      ops++;

      mapObj[node.id] = i;
      return mapObj;
    }, {});
    this.heap = this.buildHeap(array);
    // this.heap = array;
  }

  buildHeap(array) {
    const lastIdx = array.length - 1;
    const lastParentIdx = Math.floor((lastIdx - 1) / 2);
    for (let i = lastParentIdx; i >= 0; i--) this.siftDown(i, lastIdx, array);
    return array;
  }

  siftDown(parentIdx, endIdx, heap) {
    let childOneIdx = parentIdx * 2 + 1;

    while (childOneIdx <= endIdx) {
      ops++;

      let childTwoIdx = childOneIdx + 1 <= endIdx ? childOneIdx + 1 : null;
      let smallerChildIdx =
        childTwoIdx &&
        heap[childTwoIdx].distanceFromStart < heap[childOneIdx].distanceFromStart
          ? childTwoIdx
          : childOneIdx;

      if (heap[smallerChildIdx].distanceFromStart < heap[parentIdx].distanceFromStart) {
        this.swap(heap[parentIdx], heap[smallerChildIdx], heap);
        parentIdx = smallerChildIdx;
        childOneIdx = parentIdx * 2 + 1;
      } else return;
    }
  }
  siftUp(childIdx, heap) {
    ops++;

    let parentIdx = Math.floor((childIdx - 1) / 2);
    while (
      childIdx > 0 &&
      heap[childIdx].distanceFromStart < heap[parentIdx].distanceFromStart
    ) {
      this.swap(heap[childIdx], heap[parentIdx], heap);
      childIdx = parentIdx;
      parentIdx = Math.floor((childIdx - 1) / 2);
    }
  }
  remove() {
    if (!this.heap.length) return;

    this.swap(this.heap[0], this.heap[this.heap.length - 1], this.heap);
    const node = this.heap.pop();

    delete this.vertexMap[node.id];

    this.siftDown(0, this.heap.length - 1, this.heap);
    return node;
  }
  update(node, newDistance) {
    this.heap[this.vertexMap[node.id]].distanceFromStart = newDistance;
    this.siftUp(this.vertexMap[node.id], this.heap);
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  swap(node1, node2, heap) {
    const prevNodeOneIdx = this.vertexMap[node1.id];
    const prevNodeTwoIdx = this.vertexMap[node2.id];

    this.vertexMap[node1.id] = prevNodeTwoIdx;
    this.vertexMap[node2.id] = prevNodeOneIdx;
    [heap[prevNodeOneIdx], heap[prevNodeTwoIdx]] = [
      heap[prevNodeTwoIdx],
      heap[prevNodeOneIdx],
    ];
  }
}


// function dijkstrasAlgorithm(grid, startNode, finishNode) {
//   const allNodes = grid.flat(1);

//   const minDistancesHeap = new MinHeap(allNodes);

//   startNode.distanceFromStart = 0;

//   while (!minDistancesHeap.isEmpty()) {
//     const closestNode = minDistancesHeap.remove();

//     if (closestNode.isWall) continue;
//     if (closestNode.distanceFromStart === Infinity) break;

//     closestNode.visited = true;

//     if (closestNode === finishNode) {
//       finishNode.prevNode = closestNode;
//       break;
//     }

//     const neighbors = getUnvisitedNeighbors(closestNode, grid);
//     for (const neighbor of neighbors) {
//       if (neighbor.isWall) continue;

//       neighbor.distanceFromStart = closestNode.distanceFromStart + neighbor.weight;
//       neighbor.prevNode = closestNode;

//       minDistancesHeap.update(neighbor, neighbor.distanceFromStart);
//     }
//   }
//   const pathNodes = reconstructPath(finishNode);

//   return pathNodes;
// }

// function getUnvisitedNeighbors(node, grid) {
//   const neighbors = [];
//   const { row, col } = node;

//   if (row > 0) neighbors.push(grid[row - 1][col]);
//   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//   if (col > 0) neighbors.push(grid[row][col - 1]);
//   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

//   return neighbors.filter((neighbor) => !neighbor.visited);
// }

// function reconstructPath(finishNode) {
//   if (!finishNode.prevNode) return [];

//   const pathNodes = [];
//   let currentNode = finishNode;
//   while (currentNode) {
//     pathNodes.push(currentNode);
//     currentNode = currentNode.prevNode;
//   }
//   return pathNodes.reverse();
// }
