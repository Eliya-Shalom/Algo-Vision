import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { resetTimer, startTimer } from "./Timer";
import { runtimeChanged, visualizingPlayed } from "../../../store/runtime";
import { cleanPrevAlgo, copyGrid } from "../../../utils/boardUtils";
import visualizeSort from "../../../algorithms/sorting/visualizeSort";
import visualizePath from "../../../algorithms/path-finding/visualizePath";
import dynamicAStar from "../../../algorithms/path-finding/dynamicAStar";

const PlayBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { grid, view } = useSelector(({ board }) => board);
  const {
    isDone,
    isMaze,
    snapshot,
    isPainted,
    isRunning,
    runningFunc,
    instantMode,
    dynamicMode,
    isMazeRunning,
    dynamicSnapshot,
  } = useSelector(({ runtime }) => runtime);
  const { axle } = useSelector(({ axle }) => axle);

  const handleClick = () => {
    if (isMazeRunning) return;
    const { algo, type, category } = runningFunc;

    isDone && resetTimer();
    if (isPainted) {
      if (category === "path" && !dynamicMode && !window.hasPaused) cleanPrevAlgo(grid);
    }

    if (!instantMode) {
      startTimer();
      dispatch(visualizingPlayed());
    } else dispatch(runtimeChanged({ att: "isPainted", val: true }));

    window.hasPaused = false;
    window.hasAborted = false;

    if (dynamicMode)
      return dynamicAStar(copyGrid(grid), dynamicSnapshot, view.isBorders, dispatch);

    if (category === "path")
      visualizePath(algo, type, grid, snapshot.path, isMaze, dispatch, instantMode);
    else visualizeSort(axle, algo, snapshot.sort, dispatch);
  };

  const disabled = (isRunning || !runningFunc.algo || isMazeRunning) && !dynamicMode;

  return (
    <Stack alignItems="center" justifyContent="center">
      <IconButton sx={{ p: 0 }} disabled={disabled} onClick={handleClick}>
        <PlayCircleOutlineIcon
          sx={{
            fontSize: 30,
            color: disabled ? "grey.500" : "success.light",
          }}
        />
      </IconButton>

      <Typography variant="button" color="primary.light" noWrap sx={typoStyle} pt={0.5}>
        Play
      </Typography>
    </Stack>
  );
};

export default PlayBtn;
