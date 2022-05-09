import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { runtimeChanged, snapshotTook } from "../../../store/runtime";
import { uiChanged } from "../../../store/ui";
import { copySwaps, swapAndPaint } from "../../../utils/axleUtils";
import RangeInput from "../../common/RangeInput";

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

    dispatch(uiChanged({ prop: "topBar", att: "overflow", val: "hidden" }));

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
        dispatch(uiChanged({ prop: "topBar", att: "overflow", val: "auto" }));
      });
    }, 500);
  }

  function applyChanges(swaps, ogSwaps, step, prevStep, toSwap = true) {
    const isReverse = prevStep > step;

    if (isReverse) {
      for (let i = prevStep; i > step; i--) {
        if (!toSwap) swapAndPaint(swaps[i][0], { ...ogSwaps[i][1] }, 1, toSwap);
        else swapAndPaint(swaps[i][0], swaps[i][1], 1, toSwap);
      }
    } else {
      for (let i = prevStep; i < step; i++) {
        if (!toSwap) swapAndPaint(swaps[i][0], { ...ogSwaps[i][1] }, 1, toSwap);
        else swapAndPaint(swaps[i][0], swaps[i][1], 1, toSwap);
      }
    }
  }

  return <RangeInput handleChange={handleChange} />;
};

export default ProgressBar;
