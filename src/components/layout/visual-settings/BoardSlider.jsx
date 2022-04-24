import { Box, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewChanged } from "../../../store/board";

let timeout;
const BoardSlider = ({ label, defaultValue, max, min, step = 1, unit = "" }) => {
  const dispatch = useDispatch();
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);
  const { isReset } = useSelector(({ board }) => board.view);
  const [val, setVal] = useState(0);

  useEffect(() => setVal(defaultValue), [isReset]);

  const setView = ({ target }) => {
    setVal(+target.value);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let att;
      if (label === "Perspective" || label === "Scale") att = label.toLowerCase();
      else att = `rotate${label[label.length - 1]}`;
      dispatch(viewChanged({ att, val: +target.value }));
    }, 10);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: { md: "row", sm: "row", xs: "column" },
      }}>
      <Box display="flex" width="40%" justifyContent="center">
        <Typography variant="button" sx={{ fontSize: 13, color: "secondary.lighter" }}>
          {label}
        </Typography>
      </Box>

      <Box display="flex" width="70%" justifyContent="center">
        <Slider
          step={step}
          min={min}
          max={max}
          onChange={setView}
          disabled={!category}
          valueLabelDisplay="auto"
          value={val || defaultValue}
          valueLabelFormat={(label) => label + unit}
          sx={{ width: { sm: "70%", xs: "100%" }, color: "secondary.lighter" }}
        />
      </Box>
    </Box>
  );
};

export default BoardSlider;
