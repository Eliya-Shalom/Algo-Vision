import { swap } from "../../utils/axleUtils";

export default function insertionSort(array) {
  let start = performance.now();
  const swapped = [];
  let ops = 0;
  for (let i = 1; i < array.length; i++) {
    ops++;
    let j = i;
    while (j > 0 && array[j].height < array[j - 1].height) {
      swapped.push([{ ...array[j] }, { ...array[j - 1] }]);

      swap(array[j], array[j - 1]);

      ops++;
      j--;
    }
  }

  let end = performance.now();
  return [swapped, ops, end - start];
}
