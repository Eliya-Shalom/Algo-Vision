import { getFourNeighbors, reconstructPath } from "./utils";

export default function breadthFirstSearch(grid, startNode, finishNode, isMaze) {
  let ops = 0;
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

    const [neighbors, getNeighborsOps] = getFourNeighbors(currentNode, grid, isMaze);
    ops += getNeighborsOps;

    for (const neighbor of neighbors) {
      if (neighbor.visitedBFS || neighbor.isWall) continue;

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
  const [pathNodes, reconstructPathOps] = reconstructPath(finishNode);

  ops += reconstructPathOps;

  let end = performance.now();

  return [visitedNodes, pathNodes, ops, end - start];
}