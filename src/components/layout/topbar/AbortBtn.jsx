import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { resetTimer } from "./Timer";
import { cleanPrevAlgo } from "../../../utils/boardUtils";
import { visualizingAborted } from "../../../store/runtime";
import { resetIndicators } from "../../../utils/commonUtils";
import ActionBtn from "../../common/ActionBtn";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";

const AbortBtn = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { isRunning, isMazeRunning, pause, abort } = useSelector(
    ({ runtime }) => runtime
  );
  const [category] = useGetCategoryAndAlgo();

  function handleClick() {
    window.hasAborted = true;
    window.snapshot.path = { visited: [], path: [], indices: [0, 0] };

    setTimeout(() => resetTimer(), 100);

    batch(() => {
      resetIndicators(dispatch);
      dispatch(visualizingAborted());
      category === "Path-finding" && cleanPrevAlgo(grid, dispatch);
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
