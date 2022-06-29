import { getFourNeighbors, MinHeap, reconstructPath } from "./utils";

export default function dijkstra(grid, startNode, finishNode, isMaze) {
  let ops = 0;
  let start = performance.now();

  const { row: fRow, col: fCol } = finishNode;

  const visitedNodes = [];

  startNode.distanceFromStart = 0;

  const nodesToVisit = new MinHeap([startNode], "distanceFromStart");

  while (!nodesToVisit.isEmpty()) {
    ops++;
  
    const currentNodeWithMinDistance = nodesToVisit.remove();

    currentNodeWithMinDistance.visitedDijkstra = true;
    visitedNodes.push(currentNodeWithMinDistance);

    if (currentNodeWithMinDistance.distanceFromStart === Infinity) break;

    const { row, col } = currentNodeWithMinDistance;

    if (row === fRow && col === fCol) {
      finishNode.prevNode = currentNodeWithMinDistance;
      break;
    }

    const [neighbors, getNeighborsOps] = getFourNeighbors(currentNodeWithMinDistance, grid, isMaze);
    ops += getNeighborsOps;

    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.visitedDijkstra) continue;
      ops++;

      const neighborTentativeMinDistance = currentNodeWithMinDistance.distanceFromStart + neighbor.weight;

      if (neighborTentativeMinDistance >= neighbor.distanceFromStart) continue;

      neighbor.distanceFromStart = neighborTentativeMinDistance;
      neighbor.prevNode = currentNodeWithMinDistance;

      if (!nodesToVisit.containsNode(neighbor)) nodesToVisit.insert(neighbor);
      else nodesToVisit.update(neighbor);
    }
  }
  const [pathNodes, reconstructPathOps] = reconstructPath(finishNode);

  ops += nodesToVisit.ops + reconstructPathOps;

  let end = performance.now();

  return [visitedNodes, pathNodes, ops, end - start];
}
