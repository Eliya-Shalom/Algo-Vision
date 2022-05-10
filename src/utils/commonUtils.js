import { setAxleProgressBarValue } from "./axleUtils";
import { setPathProgressBarValue } from "./boardUtils";
import { resetTimer } from "../components/layout/topbar/Timer";
import { uiChanged } from "../store/ui";

export function getSpeed() {
  const speedSpan = document.getElementById("speed");

  if (!speedSpan) return 100;

  const speed = speedSpan.textContent;

  if (speed === "x0.25") return 1000;
  if (speed === "x0.50") return 500;
  if (speed === "x0.75") return 250;
  if (speed === "x1.00") return 100;
  if (speed === "x1.25") return 75;
  if (speed === "x1.50") return 50;
  if (speed === "x1.75") return 10;
  if (speed === "x2.00") return 1;

  return speed;
}

export function progressBarChanged(id) {
  const progressEle = document.getElementById(`progress-${id}`);
  if (!progressEle) return;
  return progressEle.getAttribute("changed") === "true";
}

export function countNodesOrSwapped(count) {
  const countEle = document.getElementById("nodes-or-swaps-counter");
  if (!countEle) return;
  countEle.textContent = count;
}

export function resetNodesOrSwapsCounter() {
  const countEle = document.getElementById("nodes-or-swaps-counter");
  if (!countEle) return;
  setTimeout(() => (countEle.textContent = 0), 100);
}

export function resetOpsCounter() {
  const counterSpan = document.getElementById("ops-counter");
  if (!counterSpan) return;
  counterSpan.textContent = 0;
}

export function setRealtime(time, dispatch) {
  time = time.toString();
  if (time.length > 5) time = time.slice(0, 5);
  else {
    if (Number.isInteger(+time)) time = time + ".";
    time = time + new Array(5 - time.length).fill(0).join("");
  }
  dispatch(uiChanged({ prop: "topBar", att: "realtime", val: time }));
}

export function getSizeByRef(ref) {
  if (!ref.current) return;

  const styles = getComputedStyle(ref.current);
  return [
    +styles.height.slice(0, styles.height.length - 2),
    +styles.width.slice(0, styles.width.length - 2),
  ];
}

export function resetIndicators(dispatch) {
  resetTimer();
  setRealtime(0, dispatch);
  resetNodesOrSwapsCounter();
  setPathProgressBarValue(0);
  setAxleProgressBarValue(0);
  dispatch(uiChanged({ prop: "topBar", att: "distance", val: 0 }));
  dispatch(uiChanged({ prop: "topBar", att: "opsCounter", val: 0 }));
  dispatch(uiChanged({ prop: "topBar", att: "progressBarMax", val: 0 }));
}

export function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}
