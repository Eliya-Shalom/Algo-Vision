import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Typography, Tooltip } from "@mui/material";
import GridGoldenratioIcon from "@mui/icons-material/GridGoldenratio";
import { gridChanged } from "../../../store/board";
import { runtimeChanged, visualizingAborted } from "../../../store/runtime";
import { copyGrid, cleanAndResetGrid } from "../../../utils/boardUtils";
import dfsMaze from "../../../algorithms/dfsMaze";

const MazeBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { grid, startCoords, finishCoords } = useSelector(({ board }) => board);
  const { isMaze, isRunning, instantMode, isMazeRunning } = useSelector(
    ({ runtime }) => runtime
  );

  const setboardGrid = (newGrid) => dispatch(gridChanged(newGrid));
  const setIsMazeRunning = (val) =>
    dispatch(runtimeChanged({ att: "isMazeRunning", val }));

  const animateMaze = () => {
    if (isRunning || isMazeRunning || isMaze) return;

    batch(() => {
      cleanAndResetGrid(dispatch, grid, startCoords, finishCoords, true, true, true);
      dispatch(visualizingAborted());
      dispatch(runtimeChanged({ att: "isMaze", val: true }));
      if (!instantMode) dispatch(runtimeChanged({ att: "isMazeRunning", val: true }));
    });

    dfsMaze(copyGrid(grid), setboardGrid, setIsMazeRunning, instantMode);
  };

  const disabled = isMazeRunning || isRunning || isMaze;

  return (
    <Tooltip title="DFS Maze Generation">
      <Stack>
        <IconButton disabled={disabled} onClick={animateMaze} sx={{ p: 0 }}>
          <GridGoldenratioIcon
            sx={{
              fontSize: 30,
              color: disabled ? "grey.500" : "secondary.main",
            }}
          />
        </IconButton>

        <Typography
          variant="button"
          color="primary.light"
          noWrap
          sx={typoStyle}
          pt={0.5}
          children="Maze"
        />
      </Stack>
    </Tooltip>
  );
};

export default MazeBtn;
