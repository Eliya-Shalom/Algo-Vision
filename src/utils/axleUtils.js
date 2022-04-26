import { axleChanged } from "../store/axle";
import { getRandomInt } from "./commonUtils";

export function initAxle(numOfBars, dispatch) {
  const axle = [];
  const width = 100 / numOfBars;
  const diffInHeights = +(100 / numOfBars).toFixed(2);
  let height = 0;
  for (let i = 0; i < numOfBars; i++) {
    height += diffInHeights;
    axle.push({ id: `bar-${i}`, height, width });
  }
  dispatch(axleChanged({ att: "axle", val: shuffleAxle(axle) }));
}

export function shuffleAxle(axle) {
  const shuffled = copyAxle(axle);
  const visited = {};

  let j = -1;
  visited[j] = true;

  for (let i = 0; i < axle.length; i++) {
    if (i in visited) continue;
    visited[i] = true;

    while (j in visited && Object.keys(visited).length <= axle.length - 1) {
      j = Math.floor(getRandomInt(i, axle.length - 1));
    }
    visited[j] = true;

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function animateShuffleAxle(axle) {
  const copy = copyAxle(axle);
  const visited = {};
  let i = 0;
  let j = -1;
  visited[j] = true;
  return new Promise((res) => {
    const inter = setInterval(() => {
      if (!(i in visited)) {
        visited[i] = true;

        while (j in visited) j = Math.floor(getRandomInt(i, axle.length - 1));
        visited[j] = true;

        swapProps(copy[i], copy[j]);

        if (Object.keys(visited).length >= axle.length - 1) {
          clearInterval(inter);
          res(copy);
        }
      }
      i++;
    }, 1);
  });
}

export function copyAxle(axle) {
  return axle.map((bar) => {
    return { ...bar };
  });
}

export function copyAxleByIdx(axle, start, end = axle.length) {
  const copy = [];
  for (let i = start; i < end; i++) {
    copy.push({ ...axle[i] });
  }
  return copy;
}

export function copySwaps(swaps) {
  return swaps.map(([bar1, bar2]) => {
    return [{ ...bar1 }, { ...bar2 }];
  });
}

export function setAxleProgressBarValue(value) {
  const progressEle = document.getElementById("progress-sort");
  if (!progressEle) return;
  progressEle.value = value;
}

export function setAxleProgressBarMax(max) {
  const progressEle = document.getElementById("progress-sort");
  progressEle.max = max;
}

export function swap(bar1, bar2) {
  let temp = bar1.height;
  bar1.height = bar2.height;
  bar2.height = temp;
}

export function paintBars(bars, color) {
  for (const bar of bars) {
    const barEle = document.getElementById(bar.id);
    barEle.style.backgroundColor = color;
  }
}

export function cleanBars(bars) {
  for (const bar of bars) {
    const barEle = document.getElementById(bar.id);
    barEle.style.backgroundColor = bar.color;
  }
}
let prev1, prev2;
export function swapProps(bar1, bar2, i, swap = true) {
  if (i === 0) [prev1, prev2] = [null, null];

  const bar1Ele = document.getElementById(bar1.id);
  const bar2Ele = document.getElementById(bar2.id);

  if (prev1 !== bar1 && prev1 !== bar2) {
    if (prev1) document.getElementById(prev1.id).className = "bar";
  }
  if (prev2 !== bar1 && prev2 !== bar2) {
    if (prev2) document.getElementById(prev2.id).className = "bar";
  }

  bar1Ele.style.height = `${bar2.height}%`;
  bar1Ele.className = "swap1";
  if (swap) {
    bar2Ele.style.height = `${bar1.height}%`;
    bar2Ele.className = "swap2";
  }

  prev1 = bar1;
  prev2 = bar2;

  // let temp = firstBar.height;
  // firstBar.height = secondBar.height;
  // if (swap) secondBar.height = temp;
}

// let prev1, prevSecond;
// export function swapProps(firstBar, secondBar, swap = true) {
//   const firstBarEle = document.getElementById(firstBar.id);
//   const secondBarEle = document.getElementById(secondBar.id);

//   // if ((firstBarEle.className !== "sorted1")) firstBarEle.className = "swap1";
//   if (swap) {
//     //  if (secondBarEle.className !== "sorted1") secondBarEle.className = "swap2";
//   }

//   firstBarEle.style.height = `${secondBar.height}%`;
//   if (swap) secondBarEle.style.height = `${firstBar.height}%`;

//   let temp = firstBar.height;
//   firstBar.height = secondBar.height;
//   if (swap) secondBar.height = temp;

//   // if (firstBarEle.style.height === `${firstBar.sortedHeight}%`)
//   //   firstBarEle.className = "sorted1";
//   // else {
//   //   // firstBar.height = secondBar.height;
//   // }
//   // if (secondBarEle.style.height === `${secondBar.sortedHeight}%`)
//   //   secondBarEle.className = "sorted1";
//   // else {
//   //   // if (swap) secondBar.height = temp;
//   // }

//   // if (firstBar.height === firstBar.sortedHeight) {
//   //   firstBarEle.className = "sorted1";
//   // }
//   if (secondBar.height === secondBar.sortedHeight) {
//     secondBarEle.className = "sorted1";
//   }

//   // prevFirst = firstBar;
//   // prevSecond = secondBar;
// }
