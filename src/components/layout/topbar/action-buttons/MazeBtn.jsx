import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import GridGoldenratioIcon from "@mui/icons-material/GridGoldenratio";
import { copyGrid, cleanAndResetGrid } from "../../../../utils/boardUtils";
import { runtimeChanged } from "../../../../store/runtime";
import dfsMaze from "../../../../algorithms/dfsMaze";
import ActionBtn from "../../../common/ActionBtn";
import { resetIndicators } from "../../../../utils/commonUtils";

const MazeBtn = () => {
  const { mazeWallColor } = useTheme().custom.node;
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { isMaze, isRunning, instantMode, isMazeRunning } = useSelector(
    ({ runtime }) => runtime
  );

  const handleClick = () => {
    window.snapshot.path = { visited: [], path: [], indices: [0, 0] };

    batch(() => {
      cleanAndResetGrid(grid, dispatch);
      dispatch(runtimeChanged({ att: "isMaze", val: true }));
      resetIndicators(dispatch);
    });
    dfsMaze(dispatch, copyGrid(grid), mazeWallColor, instantMode);
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
