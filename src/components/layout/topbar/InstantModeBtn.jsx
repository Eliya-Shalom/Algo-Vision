import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import { Box, Slider, Tooltip, Typography } from "@mui/material";
import { runtimeChanged } from "../../../store/runtime";

const InstantModeBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { instantMode, isRunning } = useSelector(({ runtime }) => runtime);

  function handleChange() {
    dispatch(runtimeChanged({ att: "instantMode", val: instantMode ? 0 : 1 }));
  }

  return (
    <Tooltip title="Instant-Mode (no animation)">
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <BoltSharpIcon sx={{ fontSize: 26, color: "warning.main" }} />
        <Typography
          sx={typoStyle}
          variant="button"
          color="primary.light"
          textAlign="center">
          {"Instant"} <br /> {"Mode"}
        </Typography>
        <Slider
          min={0}
          max={1}
          value={instantMode}
          orientation="vertical"
          color="secondary"
          onChange={handleChange}
          disabled={isRunning}
          sx={{ height: 30 }}
        />
      </Box>
    </Tooltip>
  );
};

export default InstantModeBtn;
