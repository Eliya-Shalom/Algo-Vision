import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Typography } from "@mui/material";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { resetTimer } from "./Timer";
import { cleanPrevAlgo } from "../../../utils/boardUtils";
import { visualizingAborted } from "../../../store/runtime";
import { resetIndicators } from "../../../utils/commonUtils";

const AbortBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { isRunning, isMazeRunning, runningFunc, pause, abort } = useSelector(
    ({ runtime }) => runtime
  );

  function handleAbort() {
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
  return (
    <Stack alignItems="center">
      <IconButton sx={{ p: 0 }} id="abort-btn" onClick={handleAbort} disabled={disabled}>
        <StopCircleOutlinedIcon
          sx={{
            fontSize: 30,
            color: disabled ? "grey.500" : "error.light",
          }}
        />
      </IconButton>

      <Typography variant="button" color="primary.light" noWrap sx={typoStyle} pt={0.5}>
        ABORT
      </Typography>
    </Stack>
  );
};

export default AbortBtn;
