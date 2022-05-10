import React from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";

const RangeInput = ({ handleChange }) => {
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);
  const { progressBarMax } = useSelector(({ ui }) => ui.topBar);
  return (
    <Stack alignItems="center" width="100%" mt={0.5}>
      <Typography
        variant="button"
        color="initial"
        sx={{ fontSize: 11 }}
        children="Progress"
      />

      <input
        className="slider"
        id={`progress-${category}`}
        type="range"
        min="0"
        max={progressBarMax}
        step={1}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default RangeInput;
