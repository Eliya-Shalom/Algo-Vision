import { swap } from "../../utils/axleUtils";

let swaps, ops;
export default function heapSort(array) {
  swaps = [];
  ops = 0;

  let start = performance.now();

  buildMaxHeap(array);
  for (let endIdx = array.length - 1; endIdx >= 1; endIdx--) {
    ops++;
    swaps.push([{ ...array[0] }, { ...array[endIdx] }]);
    swap(array[0], array[endIdx]);
    siftDown(0, endIdx - 1, array);
  }
  let end = performance.now();

  return [swaps, ops, end - start];
}

function buildMaxHeap(array) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let i = firstParentIdx; i >= 0; i--) siftDown(i, array.length - 1, array);
}

function siftDown(parentIdx, endIdx, heap) {
  let childOneIdx = parentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    ops++;

    const childTwoIdx = childOneIdx + 1 <= endIdx ? childOneIdx + 1 : null;
    const greaterChildIdx =
      childTwoIdx && heap[childTwoIdx].height > heap[childOneIdx].height
        ? childTwoIdx
        : childOneIdx;

    if (heap[greaterChildIdx].height > heap[parentIdx].height) {
      swaps.push([{ ...heap[greaterChildIdx] }, { ...heap[parentIdx] }]);

      swap(heap[greaterChildIdx], heap[parentIdx]);

      parentIdx = greaterChildIdx;
      childOneIdx = parentIdx * 2 + 1;
    } else return;
  }
}
