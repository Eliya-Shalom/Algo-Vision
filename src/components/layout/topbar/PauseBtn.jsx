import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { visualizingPaused } from "../../../store/runtime";
import ActionBtn from "../../common/ActionBtn";

const PauseBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { isRunning } = useSelector(({ runtime }) => runtime);

  function handleClick() {
    dispatch(visualizingPaused());
    window.hasPaused = true;
  }

  const disabled = !isRunning;
  const iconStyle = {
    fontSize: 30,
    color: !isRunning ? "grey.500" : "info.main",
  };
  return (
    <ActionBtn
      children={<PauseCircleOutlineIcon sx={iconStyle} />}
      disabled={disabled}
      handleClick={handleClick}
      typoStyle={typoStyle}
      label="PAUSE"
    />
  );
};

export default PauseBtn;
