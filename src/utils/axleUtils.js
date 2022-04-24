export function initAxle(numOfBars) {
  const axle = [];
  const width = 100 / numOfBars;
  const h = 100 / numOfBars;
  let height = 0;
  for (let i = 0; i < numOfBars - 1; i++) {
    height = +(height + h).toFixed(2);
    axle.push({ id: `bar-${i}`, height, width });
  }
  return shuffleAxle(axle);
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

export function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
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

export function swapProps(firstBar, secondBar, swap = true) {
  const firstBarEle = document.getElementById(firstBar.id);
  const secondBarEle = document.getElementById(secondBar.id);

  firstBarEle.style.height = `${secondBar.height}%`;
  if (swap) secondBarEle.style.height = `${firstBar.height}%`;

  let temp = firstBar.height;
  firstBar.height = secondBar.height;
  if (swap) secondBar.height = temp;
}
