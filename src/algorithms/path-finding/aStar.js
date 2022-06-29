import { getEightNeighbors, getFourNeighbors, MinHeap, reconstructPath } from "./utils";

export default function aStar(grid, startNode, finishNode, HEURISTIC, isMaze) {
  let ops = 0;
  let start = performance.now();

  const { row: fRow, col: fCol } = finishNode;

  const visitedNodes = [];

  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = calculateHeuristic(startNode, finishNode, HEURISTIC);

  const nodesToVisit = new MinHeap([startNode], "estimatedDistanceToEnd");

  while (!nodesToVisit.isEmpty()) {
    ops++;

    const currentNodeWithMinimumF = nodesToVisit.remove();
    visitedNodes.push(currentNodeWithMinimumF);

    const { row, col } = currentNodeWithMinimumF;

    if (row === fRow && col === fCol) {
      finishNode.prevNode = currentNodeWithMinimumF;
      break;
    }

    const [neighbors, getNeighborsOps] = getNodeNeighbors(currentNodeWithMinimumF, grid, HEURISTIC, isMaze);
    ops += getNeighborsOps;

    for (const neighbor of neighbors) {
      if (neighbor.isWall) continue;
      ops++;

      const neighborTentativeG = currentNodeWithMinimumF.distanceFromStart + neighbor.weight;

      if (neighborTentativeG >= neighbor.distanceFromStart) continue;

      neighbor.distanceFromStart = neighborTentativeG;
      neighbor.estimatedDistanceToEnd = neighborTentativeG + calculateHeuristic(neighbor, finishNode, HEURISTIC);
      neighbor.prevNode = currentNodeWithMinimumF;

      if (!nodesToVisit.containsNode(neighbor)) nodesToVisit.insert(neighbor);
      else nodesToVisit.update(neighbor);
    }
  }
  const [pathNodes, reconstructPathOps] = reconstructPath(finishNode);

  ops += nodesToVisit.ops + reconstructPathOps;
  
  let end = performance.now();

  return [visitedNodes, pathNodes, ops, end - start];
}

function calculateHeuristic(currentNode, finishNode, HEURISTIC) {
  if (HEURISTIC === "Manhattan") return calculateManhattanDistance(currentNode, finishNode);
  return calculateDiagonalDistance(currentNode, finishNode);
}

function calculateManhattanDistance(currentNode, finishNode) {
  return (
    Math.abs(currentNode.row - finishNode.row) +
    Math.abs(currentNode.col - finishNode.col)
  );
}

export function calculateDiagonalDistance(currentNode, finishNode) {
  const { row, col } = currentNode;
  const { row: fRow, col: fCol } = finishNode;

  const NORMAL_COST = 1;
  const DIAGONAL_COST = NORMAL_COST * 1.414;

  const dMax = Math.max(Math.abs(row - fRow), Math.abs(col - fCol));
  const dMin = Math.min(Math.abs(row - fRow), Math.abs(col - fCol));

  return DIAGONAL_COST * dMin + NORMAL_COST * (dMax - dMin);
}

function getNodeNeighbors(node, grid, HEURISTIC, isMaze) {
  if (HEURISTIC === "Manhattan") return getFourNeighbors(node, grid, isMaze);
  return getEightNeighbors(node, grid, isMaze);
}