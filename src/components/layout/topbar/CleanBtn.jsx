import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { resetTimer } from "./Timer";
import ActionBtn from "../../common/ActionBtn";
import { runtimeChanged, visualizingAborted } from "../../../store/runtime";
import { cleanAndResetGrid } from "../../../utils/boardUtils";
import { resetIndicators } from "../../../utils/commonUtils";

const CleanBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { pause, abort, isMaze, isDone, isRunning, isPainted, isMazeRunning } =
    useSelector(({ runtime }) => runtime);

  const [deg, setDeg] = useState(0);

  function handleClick() {
    setDeg(deg + 360);
    resetTimer();
    window.hasPaused = true;
    batch(() => {
      dispatch(runtimeChanged({ att: "isPainted", val: false }));
      if (isDone || isRunning || pause || isMaze || abort) {
        !isDone && dispatch(visualizingAborted());
        cleanAndResetGrid(dispatch, grid);
        isMaze && dispatch(runtimeChanged({ att: "isMaze", val: false }));
        resetIndicators(dispatch);
        window.hasAborted = true;
      } else {
        isPainted && cleanAndResetGrid(dispatch, grid);
      }
    });
  }

  const disabled = isRunning || isMazeRunning;
  const iconStyle = {
    fontSize: 30,
    transform: `rotate(-${deg}deg)`,
    transition: "transform 1s",
    color: disabled ? "grey.300" : "secondary.main",
  };
  return (
    <ActionBtn
      children={<RotateLeftIcon sx={iconStyle} />}
      disabled={disabled}
      handleClick={handleClick}
      typoStyle={typoStyle}
      label="Clean"
      tooltip="Clean Board"
    />
  );
};

export default CleanBtn;
