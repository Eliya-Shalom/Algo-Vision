import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { runtimeChanged, snapshotTook } from "../../../store/runtime";
import { copySwaps, swapAndPaint } from "../../../utils/axleUtils";

let timeout;
let prevStep = 0;
let swapsCopy = [];
let copied;

const ProgressBar = () => {
  const dispatch = useDispatch();
  const { snapshot, runningFunc, isSorted, isDone } = useSelector(
    ({ runtime }) => runtime
  );

  useEffect(() => (copied = false), [runningFunc.algo]);

  function handleChange({ target: { value } }) {
    const { swaps } = snapshot.sort;

    window.hasPaused = true;

    if (!swaps.length) return;

    if (!copied) {
      swapsCopy = copySwaps(swaps);
      copied = true;
    }

    const step = +value;
    const toSwap = !["Merge Sort", "Radix Sort"].includes(runningFunc.algo);

    applyChanges(swapsCopy, swaps, step, prevStep, toSwap);
    prevStep = step;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      window.hasPaused = false;
      batch(() => {
        dispatch(snapshotTook({ category: "sort", val: { idx: step } }));
        dispatch(runtimeChanged({ att: "isRunning", value: false }));
        isDone && dispatch(runtimeChanged({ att: "isDone", val: false }));
        isSorted && dispatch(runtimeChanged({ att: "isSort", val: false }));
      });
    }, 500);
  }

  function applyChanges(swaps, ogSwaps, step, prevStep, toSwap = true) {
    const isReverse = prevStep > step;

    if (isReverse) {
      for (let i = prevStep; i > step; i--) {
        if (!toSwap) swapAndPaint(swaps[i][0], { ...ogSwaps[i][1] }, toSwap);
        else swapAndPaint(swaps[i][0], swaps[i][1], toSwap);
      }
    } else {
      for (let i = prevStep; i < step; i++) {
        if (!toSwap) swapAndPaint(swaps[i][0], { ...ogSwaps[i][1] }, toSwap);
        else swapAndPaint(swaps[i][0], swaps[i][1], toSwap);
      }
    }
  }

  return (
    <Stack alignItems="center" width="100%">
      <Typography variant="button" color="initial" fontSize={11} children="Progress" />
      <input
        className="slider"
        id="progress-sort"
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
