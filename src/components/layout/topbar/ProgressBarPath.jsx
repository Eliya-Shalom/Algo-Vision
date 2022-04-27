import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { runtimeChanged, indicesChanged } from "../../../store/runtime";
import { paintNode } from "../../../utils/boardUtils";
import RangeInput from "../../common/RangeInput";

let timeout;
let prevStep;

const ProgressBar = () => {
  const dispatch = useDispatch();
  const { snapshot, isDone } = useSelector(({ runtime }) => runtime);
  const { visited, path } = snapshot.path;

  const handleChange = ({ target: { value } }) => {
    window.progressChanged = true;
    window.hasPaused = true;

    if (!visited.length) return;

    const currentStep = +value;
    const numOfVisited = visited.length - 1;

    let className;
    if (currentStep <= numOfVisited) {
      className = currentStep < prevStep ? "node" : "visited";
    } else className = currentStep < prevStep ? "visited" : "path";

    const visitedIdx = currentStep <= numOfVisited ? currentStep : numOfVisited;
    const pathIdx = currentStep > numOfVisited ? currentStep - numOfVisited : 0;

    const start = Math.min(currentStep, prevStep);
    const end = Math.max(currentStep, prevStep);

    for (let i = start; i < end; i++) {
      let idx = i <= numOfVisited ? i : i - numOfVisited;
      const node = currentStep <= numOfVisited ? visited[idx] : path[idx];
      if (!node) continue;
      paintNode(node, className);
    }

    prevStep = currentStep;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      window.progressChanged = false;
      batch(() => {
        dispatch(runtimeChanged({ att: "isRunning", value: false }));
        dispatch(indicesChanged({ category: "path", val: [visitedIdx, pathIdx] }));
        isDone && dispatch(runtimeChanged({ att: "isDone", val: false }));
      });
    }, 700);
  };

  return <RangeInput handleChange={handleChange} />;
};

export default ProgressBar;
