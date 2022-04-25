import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Typography, Tooltip } from "@mui/material";
import GridGoldenratioIcon from "@mui/icons-material/GridGoldenratio";
import { copyGrid, cleanAndResetGrid } from "../../../utils/boardUtils";
import { runtimeChanged } from "../../../store/runtime";
import dfsMaze from "../../../algorithms/dfsMaze";

const MazeBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { isMaze, isRunning, isPainted, instantMode, isMazeRunning } = useSelector(
    ({ runtime }) => runtime
  );

  const animateMaze = () => {
    if (isRunning || isMazeRunning || isMaze) return;

    batch(() => {
      isPainted && cleanAndResetGrid(dispatch, grid);
      dispatch(runtimeChanged({ att: "isMaze", val: true }));
      // dispatch(visualizingAborted());
    });
    dfsMaze(dispatch, copyGrid(grid), instantMode);
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