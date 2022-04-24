import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { runtimeChanged, indicesChanged } from "../../../store/runtime";
import { paintNode } from "../../../utils/boardUtils";

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
    const visitedClass = numOfVisited < 2000 ? "visited" : "visited-opt";
    const pathClass = numOfVisited < 2000 ? "path" : "path-opt";

    let className;
    if (currentStep <= numOfVisited) {
      className = currentStep < prevStep ? "node" : visitedClass;
    } else className = currentStep < prevStep ? visitedClass : pathClass;

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

  return (
    <Stack alignItems="center" width="100%">
      <Typography
        variant="button"
        color="initial"
        sx={{ fontSize: 11 }}
        children="Progress"
      />

      <input
        className="slider"
        id="progress-path"
        type="range"
        min="0"
        max="0"
        step={1}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default ProgressBar;
