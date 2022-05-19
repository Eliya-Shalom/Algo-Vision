import { calculateDiagonalDistance, getEightNeighbors, MinHeap } from "./aStar";
import { countNodesOrSwapped, getSpeed } from "../../utils/commonUtils";
import { pauseTimer, resetTimer } from "../../components/layout/topbar/indicators/Timer";
import {
  dynamicSnapshotTook,
  visualizingAborted,
  visualizingDone,
} from "../../store/runtime";
import { nodeChanged } from "../../store/board";

let lastNode;

export default function dynamicAStar(grid, snapshot, isBorders, dispatch) {
  const { heap, nodesIdsToIndicesMap } = snapshot;

  let nodesToVisit = new MinHeap([]);
  const startNode = { ...window.startNode };
  if (!heap.length) {
    startNode.distanceFromStart = 0;
    startNode.estimatedDistanceToEnd = calculateDiagonalDistance(
      startNode,
      window.finishNode,
      "Diagonal"
    );
    nodesToVisit.insert(startNode);
  } else {
    nodesToVisit.heap = heap.map((node) => {
      return { ...node };
    });
    nodesToVisit.nodesIdsToIndicesMap = { ...nodesIdsToIndicesMap };
  }

  let prevFinishNode = window.finishNode;
  let currentTarget;
  let visitedCount = 0;
  const speed = getSpeed();

  if (lastNode) paint(lastNode, isBorders, "node");

  const visitedInter = setInterval(() => {
    if (window.targetNodes.length) currentTarget = window.targetNodes[0];
    else currentTarget = window.finishNode;

    const currentNodeWithMinimumF = nodesToVisit.remove();
    let { row: tRow, col: tCol } = currentTarget;

    paint(currentNodeWithMinimumF, isBorders);
    countNodesOrSwapped(++visitedCount);

    if (prevFinishNode !== window.finishNode && !window.targetNodes.length) {
      resetNodes(grid, currentNodeWithMinimumF, window.finishNode);
      prevFinishNode = window.finishNode;
    }

    const { row, col } = currentNodeWithMinimumF;

    if (row === tRow && col === tCol) {
      if (currentTarget === window.finishNode)
        return handleAbort(visitedInter, dispatch, true);

      let { id } = window.targetNodes.shift();
      const targetEle = document.getElementById(id);
      targetEle.removeChild(targetEle.firstChild);
      dispatch(nodeChanged({ row: tRow, col: tCol, att: "midway", val: false }));

      if (window.targetNodes.length) currentTarget = window.targetNodes[0];
      else currentTarget = window.finishNode;

      resetNodes(grid, currentNodeWithMinimumF, currentTarget);
    }

    const neighbors = getEightNeighbors(currentNodeWithMinimumF, grid, false);
    for (const neighbor of neighbors) {
      const { row: nRow, col: nCol } = neighbor;
      if (isWall(neighbor) || (isMidway(neighbor) && (nRow !== tRow || nCol !== tCol)))
        continue;

      const neighborTentativeG = currentNodeWithMinimumF.distanceFromStart + 1;

      if (neighborTentativeG >= neighbor.distanceFromStart) continue;
      neighbor.prevNode = currentNodeWithMinimumF;
      if (neighbor === currentNodeWithMinimumF.prevNode)
        currentNodeWithMinimumF.prevNode = null;
      neighbor.distanceFromStart = neighborTentativeG;
      neighbor.estimatedDistanceToEnd =
        neighborTentativeG + calculateDiagonalDistance(neighbor, currentTarget);

      if (!nodesToVisit.containsNode(neighbor)) {
        nodesToVisit.insert(neighbor);
      } else nodesToVisit.update(neighbor);
    }

    if (window.hasPaused) {
      lastNode = currentNodeWithMinimumF;
      paint(lastNode, isBorders, "visited");
      return handlePause(visitedInter, nodesToVisit, dispatch);
    }
    if (window.hasAborted) return handleAbort(visitedInter, dispatch);
    if (nodesToVisit.isEmpty()) return handleAbort(visitedInter, dispatch, true);
  }, speed);
}

function handlePause(inter, MinHeap, dispatch) {
  const { heap, nodesIdsToIndicesMap } = MinHeap;
  clearInterval(inter);
  pauseTimer();
  dispatch(dynamicSnapshotTook({ heap, nodesIdsToIndicesMap }));
}

function handleAbort(inter, dispatch, isFinish = false) {
  if (isFinish) {
    pauseTimer();
    dispatch(visualizingDone());
  } else {
    resetTimer();
    dispatch(visualizingAborted());
  }
  clearInterval(inter);
  dispatch(dynamicSnapshotTook({ heap: [], nodesIdsToIndicesMap: {} }));
}

function resetNodes(grid, node, targetNode) {
  for (const row of grid) {
    for (const node of row) {
      node.estimatedDistanceToEnd = Infinity;
      node.distanceFromStart = Infinity;
    }
  }
  node.distanceFromStart = 0;
  node.estimatedDistanceToEnd = calculateDiagonalDistance(node, targetNode);
}

function paint({ row, col, id }, isBorders, className = "chase") {
  const { row: sRow, col: sCol } = window.startNode;
  const { row: fRow, col: fCol } = window.finishNode;
  if ((row === sRow && col === sCol) || (row === fRow && col === fCol)) {
    return;
  }
  const nodeEle = document.getElementById(id);
  nodeEle.className = "node";
  setTimeout(() => (nodeEle.className = className), 50);
  setTimeout(() => {
    nodeEle.className = "node";
    nodeEle.style.outline = isBorders && "0.5px solid rgba(179, 179, 179, .5)";
  }, 2000);
}

function isWall(node) {
  return document.getElementById(node.id).className === "wall";
}

function isMidway(node) {
  return document.getElementById(node.id).className === "midway";
}
