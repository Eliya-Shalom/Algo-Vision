import { copyAxle, copyAxleByIdx } from "../../utils/axleUtils";

let swaps, merges, ops, i;
export default function mergeSort(array) {
  swaps = [];
  merges = [];
  ops = 0;
  i = 0;
  let start = performance.now();

  const ogAxle = copyAxle(array);

  mergeWithoutSort(array, ogAxle);
  mergeSortHelper(array, ogAxle);

  let end = performance.now();

  return [swaps, ops, end - start];
}

function mergeWithoutSort(array, ogAxle) {
  if (array.length <= 1) return array;

  let mid = Math.floor(array.length / 2);

  let ogLeft = mergeWithoutSort(copyAxleByIdx(array, 0, mid), ogAxle);
  let ogRight = mergeWithoutSort(copyAxleByIdx(array, mid), ogAxle);

  const mergedUnsorted = ogLeft.concat(ogRight);

  merges.push(mergedUnsorted);

  return mergedUnsorted;
}

function mergeSortHelper(array, ogAxle) {
  ops++;

  if (array.length <= 1) return array;

  let mid = Math.floor(array.length / 2);

  let left = mergeSortHelper(copyAxleByIdx(array, 0, mid), ogAxle);
  let right = mergeSortHelper(copyAxleByIdx(array, mid), ogAxle);

  const mergedSorted = merge(left, right);

  storeSwaps(mergedSorted, merges[i]);

  i++;

  return mergedSorted;
}

function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let results = [];

  while (i < arr1.length && j < arr2.length) {
    ops++;

    if (arr2[j].height > arr1[i].height) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    ops++;

    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    ops++;

    results.push(arr2[j]);
    j++;
  }

  return results;
}

function storeSwaps(sorted, unsorted) {
  for (let i = 0; i < sorted.length; i++) {
    swaps.push([{ ...unsorted[i] }, { ...sorted[i] }]);
  }
}
