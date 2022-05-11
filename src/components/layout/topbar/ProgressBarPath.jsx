import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { runtimeChanged } from "../../../store/runtime";
import { uiChanged } from "../../../store/ui";
import { paintNode } from "../../../utils/boardUtils";
import RangeInput from "../../common/RangeInput";

let timeout;
let prevStep;
let prevVisitedIdx = 0;
let prevPathIdx = 0;

const ProgressBar = () => {
  const dispatch = useDispatch();
  const { isDone } = useSelector(({ runtime }) => runtime);
  const { topBar, isMobile } = useSelector(({ ui }) => ui);

  const handleChange = ({ target: { value } }) => {
    const { visited, path } = window.snapshot.path;
    window.hasPaused = true;

    if (!visited.length) return;

    isMobile && dispatch(uiChanged({ prop: "topBar", att: "overflow", val: "hidden" }));

    const currentStep = +value;
    const numOfVisited = visited.length - 1;

    let className, pathIdx, visitedIdx, startVisited, endVisited, startPath, endPath;

    if (currentStep <= numOfVisited) {
      visitedIdx = currentStep;
      pathIdx = 0;
    } else {
      visitedIdx = numOfVisited;
      pathIdx = currentStep - numOfVisited;
    }

    startVisited = Math.min(visitedIdx, prevVisitedIdx);
    endVisited = Math.max(visitedIdx, prevVisitedIdx);
    startPath = Math.min(pathIdx, prevPathIdx);
    endPath = Math.max(pathIdx, prevPathIdx);

    for (let i = startPath; i <= endPath; i++) {
      if (!path[i]) continue;
      className = currentStep < prevStep ? "visited" : "path";
      paintNode(path[i], className);
    }

    for (let i = startVisited; i <= endVisited + 5; i++) {
      if (!visited[i]) continue;
      className = currentStep < prevStep ? "node" : "visited";
      paintNode(visited[i], className);
    }

    if (topBar.progressBarMax === currentStep)
      for (let i = 0; i < pathIdx; i++) paintNode(path[i], "path");

    [prevVisitedIdx, prevPathIdx] = [visitedIdx, pathIdx];
    prevStep = currentStep;

    window.snapshot.path.indices = [visitedIdx, pathIdx];

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      batch(() => {
        dispatch(runtimeChanged({ att: "isRunning", value: false }));
        isDone && dispatch(runtimeChanged({ att: "isDone", val: false }));
        isMobile && dispatch(uiChanged({ prop: "topBar", att: "overflow", val: "auto" }));
      });
    }, 250);
  };

  return <RangeInput handleChange={handleChange} />;
};

export default ProgressBar;
