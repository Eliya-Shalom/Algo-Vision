export class MinHeap {
  constructor(array, heapBy) {
    this.ops = 0;
    this.heapBy = heapBy;
    this.nodesMap = array.reduce((set, node, nodeIdx) => {
      this.ops++;

      set[node.id] = nodeIdx;
      return set;
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
      this.ops++;

      const childTwoIdx = childOneIdx + 1 <= endIdx ? childOneIdx + 1 : null;
      const smallerChildIdx =
        childTwoIdx && heap[childTwoIdx][this.heapBy] < heap[childOneIdx][this.heapBy]
          ? childTwoIdx
          : childOneIdx;
      if (heap[smallerChildIdx][this.heapBy] < heap[parentIdx][this.heapBy]) {
        this.swap(smallerChildIdx, parentIdx, heap);
        parentIdx = smallerChildIdx;
        childOneIdx = parentIdx * 2 + 1;
      } else return;
    }
  }
  siftUp(childIdx, heap) {
    let parentIdx = Math.floor((childIdx - 1) / 2);
    while (childIdx > 0 && heap[childIdx][this.heapBy] < heap[parentIdx][this.heapBy]) {
      this.ops++;
      this.swap(childIdx, parentIdx, heap);
      childIdx = parentIdx;
      parentIdx = Math.floor((childIdx - 1) / 2);
    }
  }
  remove() {
    if (!this.heap.length) return;
    this.swap(0, this.heap.length - 1);

    const removedNode = this.heap.pop();

    delete this.nodesMap[removedNode.id];

    this.siftDown(0, this.heap.length - 1, this.heap);

    return removedNode;
  }
  insert(node) {
    this.heap.push(node);
    this.nodesMap[node.id] = this.heap.length - 1;

    this.siftUp(this.heap.length - 1, this.heap);
  }
  swap(i, j, heap = this.heap) {
    this.nodesMap[heap[i].id] = j;
    this.nodesMap[heap[j].id] = i;
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }
  containsNode(node) {
    return node.id in this.nodesMap;
  }
  update(node) {
    this.siftUp(this.nodesMap[node.id], this.heap);
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

export function getFourNeighbors(node, grid, isMaze) {
  let ops = 0;

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

  return [neighbors, ops];
}

export function getEightNeighbors(node, grid, isMaze) {
  let [fourNeighbors, operations] = getFourNeighbors(node, grid, isMaze);

  const diagonallyNeighbors = [];
  const { row, col } = node;

  if (isMaze) return fourNeighbors;

  if (row > 0 && col > 0) {
    operations++;
    diagonallyNeighbors.push(grid[row - 1][col - 1]);
  }
  if (row > 0 && col < grid[0].length - 1) {
    operations++;
    diagonallyNeighbors.push(grid[row - 1][col + 1]);
  }
  if (row < grid.length - 1 && col < grid[0].length - 1) {
    operations++;
    diagonallyNeighbors.push(grid[row + 1][col + 1]);
  }
  if (row < grid.length - 1 && col > 0) {
    operations++;
    diagonallyNeighbors.push(grid[row + 1][col - 1]);
  }

  return [fourNeighbors.concat(diagonallyNeighbors), operations];
}

export function reconstructPath(finishNode) {
  if (!finishNode.prevNode) return [];
  let ops = 0;

  const pathNodes = [];

  let currentNode = finishNode;

  while (currentNode) {
    ops++;

    pathNodes.push(currentNode);
    currentNode = currentNode.prevNode;
  }
  return [pathNodes.reverse(), ops];
}
