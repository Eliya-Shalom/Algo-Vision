import { batch } from "react-redux";
import aStar from "./aStar";
import dijkstra from "./dijkstra";
import depthFirstSearch from "./dfs";
import breadthFirstSearch from "./bfs";
import * as utils from "../../utils/boardUtils";
import * as commUtils from "../../utils/commonUtils";
import { uiChanged } from "../../store/ui";
import { visualizingDone } from "../../store/runtime";
import { pauseTimer, resetTimer } from "../../components/layout/topbar/Timer";

// global variables
let dispatch, grid, visited, path, visitedIdx, pathIdx, ops, realtime, isMaze;

export default function visualizePath(
  algo,
  type,
  tableGrid,
  maze,
  toDispatch,
  instantMode
) {
  dispatch = toDispatch;
  grid = tableGrid;
  isMaze = maze;
  path = window.snapshot.path.path;
  [visitedIdx, pathIdx] = window.snapshot.path.indices;

  [visited, path, ops, realtime] = getAlgo(algo, type);

  const distance = path.length ? path[path.length - 1].prevNode.distanceFromStart : 0;
  commUtils.setRealtime(realtime, dispatch);
  batch(() => {
    dispatch(uiChanged({ prop: "topBar", att: "distance", val: distance }));
    dispatch(uiChanged({ prop: "topBar", att: "opsCounter", val: ops }));
    dispatch(
      uiChanged({
        prop: "topBar",
        att: "progressBarMax",
        val: visited.length + path.length - 2,
      })
    );
  });

  if (instantMode) {
    commUtils.countNodesOrSwapped(visited.length - 1);
    setTimeout(
      () => utils.setPathProgressBarValue(visited.length + path.length - 2),
      250
    );
    window.snapshot.path = {
      visited,
      path,
      indices: [visited.length - 1, path.length - 1],
    };
    return instantVisual();
  }

  animateVisitedNodes();
}

function animateVisitedNodes() {
  if (visitedIdx >= visited.length - 1) {
    pauseTimer();
    return setTimeout(animatePath, commUtils.getSpeed());
  }

  if (window.hasAborted) return handleAbort();
  if (window.hasPaused) return handlePause();

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
  if (window.hasPaused) return handlePause();

  const node = path[pathIdx];
  utils.paintNode(node, "path");
  utils.setPathProgressBarValue(visitedIdx, pathIdx);

  pathIdx++;

  setTimeout(animatePath, commUtils.getSpeed());
}

function handlePause() {
  pauseTimer();
  window.snapshot.path = { visited, path, indices: [visitedIdx, pathIdx] };
}

function handleAbort() {
  resetTimer();
}

function handleFinish() {
  pauseTimer();
  if (!path.length) utils.paintNodes(visited, "not-found");
  dispatch(visualizingDone());
  window.snapshot.path = { visited, path, indices: [0, 0] };
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
