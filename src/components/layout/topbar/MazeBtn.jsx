import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import GridGoldenratioIcon from "@mui/icons-material/GridGoldenratio";
import { copyGrid, cleanAndResetGrid } from "../../../utils/boardUtils";
import { runtimeChanged } from "../../../store/runtime";
import dfsMaze from "../../../algorithms/dfsMaze";
import ActionBtn from "../../common/ActionBtn";

const MazeBtn = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { isMaze, isRunning, isPainted, instantMode, isMazeRunning } = useSelector(
    ({ runtime }) => runtime
  );

  const handleClick = () => {
    batch(() => {
      isPainted && cleanAndResetGrid(dispatch, grid);
      dispatch(runtimeChanged({ att: "isMaze", val: true }));
    });
    dfsMaze(dispatch, copyGrid(grid), instantMode);
  };

  const disabled = isMazeRunning || isRunning || isMaze;
  const iconStyle = {
    fontSize: 30,
    color: disabled ? "grey.500" : "secondary.main",
  };
  return (
    <ActionBtn
      children={<GridGoldenratioIcon sx={iconStyle} />}
      disabled={disabled}
      handleClick={handleClick}
      label="Maze"
      tooltip="DFS Maze Generation"
    />
  );
};

export default MazeBtn;
