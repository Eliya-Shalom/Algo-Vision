import React from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import TitleIcon from "../../common/TitleIcon";

let timerTimeout;
let currentTime = 0;
const Timer = () => {
  const iconStyle = { color: "secondary.main", fontSize: 30 };
  return (
    <TitleIcon
      icon={<TimerOutlinedIcon sx={iconStyle} />}
      tooltip="Animation Time"
      label={
        <div>
          <span id="timer">0.000</span>
          <strong style={{ fontSize: 10 }}>s</strong>
        </div>
      }
    />
  );
};

export default Timer;

const getReadableTime = (time) => {
  if (time.length === 1) return "0.00" + time;
  else if (time.length === 2) return "0.0" + time;
  else if (time.length === 3) return "0." + time;
  else if (time.length === 4) return time.slice(0, 1) + "." + time.slice(1);
  else return time.slice(0, 2) + "." + time.slice(2);
};

const accurateTimer = (ms, startTime) => {
  currentTime = new Date().getTime() - startTime;
  const timerEle = document.getElementById("timer");
  timerEle.textContent = currentTime;

  const init = (accurateMs) => {
    let currentIntervalStartTime = new Date().getTime();
    timerTimeout = setTimeout(() => {
      let deflection = new Date().getTime() - currentIntervalStartTime - ms;
      init(accurateMs - deflection);

      currentTime = new Date().getTime() - startTime;
      timerEle.textContent = getReadableTime(currentTime.toString());
    }, accurateMs);
  };
  init(ms);
};

export const startTimer = () => {
  const startTime = new Date().getTime() - currentTime;
  accurateTimer(1, startTime);
};

export const pauseTimer = () => {
  clearTimeout(timerTimeout);
  const timerEle = document.getElementById("timer");
  timerEle.textContent = getReadableTime(currentTime.toString());
};

export const resetTimer = () => {
  clearTimeout(timerTimeout);
  currentTime = 0;
  const timerEle = document.getElementById("timer");
  timerEle.textContent = getReadableTime(currentTime.toString());
};
