import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { resetTimer } from "./Timer";
import { cleanPrevAlgo } from "../../../utils/boardUtils";
import { visualizingAborted } from "../../../store/runtime";
import { resetIndicators } from "../../../utils/commonUtils";
import ActionBtn from "../../common/ActionBtn";

const AbortBtn = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { isRunning, isMazeRunning, runningFunc, pause, abort } = useSelector(
    ({ runtime }) => runtime
  );

  function handleClick() {
    if (isRunning && pause) return;

    window.hasAborted = true;
    setTimeout(() => resetTimer(), 100);

    batch(() => {
      resetIndicators(dispatch);
      dispatch(visualizingAborted());
      runningFunc.category === "path" && cleanPrevAlgo(grid);
    });
  }
  const disabled = (!isRunning && !pause) || isMazeRunning || abort;
  const iconStyle = {
    fontSize: 30,
    color: disabled ? "grey.500" : "error.light",
  };

  return (
    <ActionBtn
      children={<StopCircleOutlinedIcon sx={iconStyle} />}
      disabled={disabled}
      handleClick={handleClick}
      label="ABORT"
    />
  );
};

export default AbortBtn;
