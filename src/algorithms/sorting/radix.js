import { copyAxle } from "../../utils/axleUtils";

let swaps, ops;
export default function radixSort(array) {
  swaps = [];
  ops = 0;
  if (array.length <= 1) return array;

  let start = performance.now();

  const ogArray = copyAxle(array);

  const maxHeight = array.reduce((a, b) => (a.height > b.height ? a : b)).height;
  const MULTIPLIER = !Number.isInteger(maxHeight) ? 100 : maxHeight > 99 ? 10 : 1;
  const MAX = array.reduce((a, b) => (a.height > b.height ? a : b)).height * MULTIPLIER;

  let digit = 0;

  while (Math.floor(MAX / 10 ** digit) > 0) {
    ops++;

    countingSort(array, digit, MULTIPLIER);

    storeSwaps(array, ogArray);

    digit++;
  }

  let end = performance.now();

  return [swaps, ops, end - start];
}

function countingSort(array, digit, MULTIPLIER) {
  ops++;

  const sortedArray = new Array(array.length).fill(0);
  const countArray = new Array(10).fill(0);

  const digitColumn = 10 ** digit;

  for (const { height } of array) {
    ops++;
    const numAtDigitColumn = Math.floor((height * MULTIPLIER) / digitColumn) % 10;
    countArray[numAtDigitColumn]++;
  }

  for (let i = 1; i < 10; i++) {
    ops++;

    countArray[i] += countArray[i - 1];
  }

  for (let i = array.length - 1; i >= 0; i--) {
    ops++;
    const { height } = array[i];
    let numAtDigitColumn = Math.floor((height * MULTIPLIER) / digitColumn) % 10;
    const sortedIdx = --countArray[numAtDigitColumn];
    sortedArray[sortedIdx] = array[i];
  }

  for (let i = 0; i < array.length; i++) {
    ops++;

    array[i] = sortedArray[i];
  }
}

function storeSwaps(sorted, unsorted) {
  for (let i = 0; i < sorted.length; i++) {
    swaps.push([{ ...unsorted[i] }, { ...sorted[i] }]);
  }
}
