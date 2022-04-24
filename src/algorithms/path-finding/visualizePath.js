import aStar from "./aStar";
import depthFirstSearch from "./dfs";
import breadthFirstSearch from "./bfs";
import dijkstra from "./dijkstra";
import * as utils from "../../utils/boardUtils";
import * as commUtils from "../../utils/commonUtils";
import { pauseTimer, resetTimer } from "../../components/layout/topbar/Timer";
import { runtimeChanged, snapshotTook, visualizingDone } from "../../store/runtime";
import { batch } from "react-redux";

// global variables
let dispatch, grid, visited, path, visitedIdx, pathIdx, ops, realtime, isMaze;

export default function visualizePath(
  algo,
  type,
  tableGrid,
  snapshot,
  maze,
  dispatchAction,
  instantMode
) {
  dispatch = dispatchAction;
  grid = tableGrid;
  isMaze = maze;
  path = snapshot.path;
  [visitedIdx, pathIdx] = snapshot.indices;

  [visited, path, ops, realtime] = getAlgo(algo, type);

  const distance = path.length ? path[path.length - 1].prevNode.distanceFromStart : 0;
  dispatch(runtimeChanged({ att: "distance", val: distance }));
  commUtils.setRealtime(realtime, dispatch);
  commUtils.incrementOpsCounter(ops);

  if (instantMode) {
    commUtils.countNodesOrSwapped(visited.length - 1);
    return instantVisual();
  }

  utils.setPathProgressBarMax(visited, path);

  animateVisitedNodes();
}

function animateVisitedNodes() {
  if (visitedIdx >= visited.length - 1) {
    pauseTimer();
    return setTimeout(animatePath, commUtils.getSpeed());
  }

  if (window.hasAborted) return handleAbort();
  if (window.hasPaused || window.progressChanged) return handlePause();

  const node = visited[visitedIdx];
  utils.paintNode(node, "visited");
  utils.setPathProgressBarValue(visitedIdx);
  commUtils.countNodesOrSwapped(visitedIdx);

  visitedIdx++;

  setTimeout(animateVisitedNodes, commUtils.getSpeed());
}

function animatePath() {
  if (!path.length || pathIdx >= path.length - 1) {
    return handleFinish();
  }

  if (window.hasAborted) return handleAbort();
  if (window.hasPaused || window.progressChanged) return handlePause();

  const node = path[pathIdx];
  utils.paintNode(node, "path");
  utils.setPathProgressBarValue(visitedIdx, pathIdx);

  pathIdx++;

  setTimeout(animatePath, commUtils.getSpeed());
}

function handlePause() {
  pauseTimer();
  dispatch(
    snapshotTook({
      category: "path",
      val: { visited, path, indices: [visitedIdx, pathIdx] },
    })
  );
}

function handleAbort() {
  resetTimer();
  // dispatch(
  //   snapshotTook({
  //     category: "path",
  //     val: { visited: [], path: [], indices: [0, 0] },
  //   })
  // );
}

function handleFinish() {
  pauseTimer();
  if (!path.length) utils.paintNodes(visited, "not-found");
  batch(() => {
    dispatch(visualizingDone());
    dispatch(snapshotTook({ category: "path", val: { visited, path, indices: [0, 0] } }));
  });
  utils.setPathProgressBarValue(visitedIdx, pathIdx);
}

function instantVisual() {
  utils.paintNodes(visited, "visited");
  utils.paintNodes(path, "path");
}

function getAlgo(algo, type) {
  const gridCopy = utils.copyGrid(grid);

  const { startNode, finishNode } = window;
  if (algo === "aStar") {
    return aStar(gridCopy, { ...startNode }, { ...finishNode }, type, isMaze);
  } else if (algo === "Dijkstra Algorithm") {
    return dijkstra(gridCopy, { ...startNode }, { ...finishNode }, isMaze);
  } else if (algo === "Depth-First-Search") {
    return depthFirstSearch(gridCopy, { ...startNode }, { ...finishNode }, isMaze);
  } else if (algo === "Breadth-First-Search") {
    return breadthFirstSearch(gridCopy, { ...startNode }, { ...finishNode }, isMaze);
  }
}
