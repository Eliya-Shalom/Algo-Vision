import { swap } from "../../utils/axleUtils";

export default function bubbleSort(array) {
  let start = performance.now();

  const swapped = [];
  let ops = 0;

  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    ops++;

    isSorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      ops++;

      if (array[i].height > array[i + 1].height) {
        swapped.push([{ ...array[i] }, { ...array[i + 1] }]);
        swap(array[i], array[i + 1]);
        isSorted = false;
      }
    }
    counter++;
  }
  let end = performance.now();

  return [swapped, ops, end - start];
}
