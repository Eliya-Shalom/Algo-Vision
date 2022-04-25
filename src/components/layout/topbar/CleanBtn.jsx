import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { resetTimer } from "./Timer";
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

  return (
    <Tooltip title="Clean Board">
      <Stack>
        <IconButton disabled={disabled} onClick={handleClick} sx={{ p: 0 }}>
          <RotateLeftIcon
            id="rotate"
            sx={{
              fontSize: 30,
              transform: `rotate(-${deg}deg)`,
              transition: "transform 1s",
              color: disabled ? "grey.300" : "secondary.main",
            }}
          />
        </IconButton>
        <Typography variant="button" color="primary.light" noWrap sx={typoStyle} pt={0.5}>
          Clean
        </Typography>
      </Stack>
    </Tooltip>
  );
};

export default CleanBtn;
