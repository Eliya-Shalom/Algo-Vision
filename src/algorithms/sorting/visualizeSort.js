import { batch } from "react-redux";
import insertionSort from "./insertion";
import selectionSort from "./selection";
import bubbleSort from "./bubble";
import quickSort from "./quick";
import mergeSort from "./merge";
import heapSort from "./heap";
import radixSort from "./radix";
import * as utils from "../../utils/axleUtils";
import * as commUtils from "../../utils/commonUtils";
import { pauseTimer } from "../../components/layout/topbar/Timer";
import { snapshotTook, visualizingDone } from "../../store/runtime";
import { uiChanged } from "../../store/ui";

let i, ops, dispatch, algo, realTime, timeout;
export default function visualizeSort(axle, algorithm, snapshot, toDispatch) {
  algo = algorithm;
  dispatch = toDispatch;
  i = snapshot.idx;
  let swaps = utils.copySwaps(snapshot.swaps);
  if (!swaps.length) {
    [swaps, ops, realTime] = getAlgo(algo, utils.copyAxle(axle));
  }
  dispatch(uiChanged({ prop: "topBar", att: "opsCounter", val: ops }));
  commUtils.setRealtime(realTime, dispatch);
  utils.setAxleProgressBarMax(swaps.length - 1);

  const toSwap = !["Merge Sort", "Radix Sort"].includes(algo);

  animateSort(swaps, toSwap);
}

function animateSort(swaps, toSwap) {
  toSwap && commUtils.countNodesOrSwapped(i);
  utils.setAxleProgressBarValue(i);
  utils.swapAndPaint({ ...swaps[i][0] }, { ...swaps[i][1] }, i, toSwap);

  i++;
  if (i === swaps.length) {
    clearTimeout(timeout);
    return handleFinish(dispatch, swaps);
  }

  if (window.hasAborted) return;
  if (window.hasPaused) return handlePause(dispatch, swaps, i);

  clearTimeout(timeout);
  timeout = setTimeout(() => animateSort(swaps, toSwap), commUtils.getSpeed());
}

function getAlgo(algo, axle) {
  if (algo === "Insertion Sort") return insertionSort(axle);
  if (algo === "Selection Sort") return selectionSort(axle);
  if (algo === "Bubble Sort") return bubbleSort(axle);
  if (algo === "Quick Sort") return quickSort(axle);
  if (algo === "Merge Sort") return mergeSort(axle);
  if (algo === "Heap Sort") return heapSort(axle);
  if (algo === "Radix Sort") return radixSort(axle);
}

function handlePause(dispatch, swaps, idx) {
  pauseTimer();
  dispatch(
    snapshotTook({
      category: "sort",
      val: { swaps, idx },
    })
  );
  utils.setAxleProgressBarValue(i);
}

function handleFinish(dispatch, swaps) {
  const [bar1, bar2] = swaps[swaps.length - 1];
  document.getElementById(bar1.id).className = "bar";
  document.getElementById(bar2.id).className = "bar";

  pauseTimer();
  batch(() => {
    dispatch(visualizingDone());
    dispatch(snapshotTook({ category: "sort", val: { swaps } }));
  });
  utils.setAxleProgressBarValue(swaps.length - 1);
}

// function handleAbort(dispatch) {}
