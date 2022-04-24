import { swap } from "../../utils/axleUtils";

let start, ops;
export default function quickSort(array) {
  ops = 0;
  start = performance.now();
  const swaps = [];
  return quickSortHelper(array, 0, array.length - 1, swaps);
}

function quickSortHelper(array, startIdx, endIdx, swaps) {
  if (startIdx >= endIdx) return;
  ops++;

  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;

  while (leftIdx <= rightIdx) {
    ops++;
    if (
      array[leftIdx].height > array[pivotIdx].height &&
      array[rightIdx].height < array[pivotIdx].height
    ) {
      swaps.push([{ ...array[leftIdx] }, { ...array[rightIdx] }]);
      swap(array[leftIdx], array[rightIdx]);
    }
    if (array[leftIdx].height <= array[pivotIdx].height) leftIdx++;
    if (array[rightIdx].height >= array[pivotIdx].height) rightIdx--;
  }
  swaps.push([{ ...array[pivotIdx] }, { ...array[rightIdx] }]);
  swap(array[pivotIdx], array[rightIdx]);

  const leftSubarrayLength = rightIdx - 1 - startIdx;
  const rightSubarrayLength = endIdx - (startIdx + 1);

  if (leftSubarrayLength < rightSubarrayLength) {
    quickSortHelper(array, startIdx, rightIdx - 1, swaps);
    quickSortHelper(array, rightIdx + 1, endIdx, swaps);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx, swaps);
    quickSortHelper(array, startIdx, rightIdx - 1, swaps);
  }

  let end = performance.now();
  return [swaps, ops, end - start];
}
