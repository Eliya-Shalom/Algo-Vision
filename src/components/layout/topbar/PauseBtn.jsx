import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Typography } from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { visualizingPaused } from "../../../store/runtime";

const PauseBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { isRunning } = useSelector(({ runtime }) => runtime);

  function handleClick() {
    dispatch(visualizingPaused());
    window.hasPaused = true;
  }

  const disabled = !isRunning;

  return (
    <Stack alignItems="center">
      <IconButton sx={{ p: 0 }} onClick={handleClick} disabled={disabled}>
        <PauseCircleOutlineIcon
          sx={{
            fontSize: 30,
            color: !isRunning ? "grey.500" : "info.main",
          }}
        />
      </IconButton>

      <Typography variant="button" color="primary.light" noWrap sx={typoStyle} pt={0.5}>
        Pause
      </Typography>
    </Stack>
  );
};

export default PauseBtn;
