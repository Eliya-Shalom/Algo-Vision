import React from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import useGetCategoryAndAlgo from "../../hooks/useGetCategoryAndAlgo";

const RangeInput = ({ handleChange }) => {
  const { progressBarMax } = useSelector(({ ui }) => ui.topBar);
  const [category] = useGetCategoryAndAlgo();
  return (
    <Stack alignItems="center" width="100%" mt={0.5}>
      <Typography
        variant="button"
        color="inherit"
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
