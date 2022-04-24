import { Box, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dimensionsChanged } from "../../../store/board";

let timeout;
const TableSlider = ({ label, defaultValue, max, min }) => {
  const dispatch = useDispatch();
  const { isRunning, runningFunc } = useSelector(({ runtime }) => runtime);
  const { isReset } = useSelector(({ board }) => board.view);
  const [val, setVal] = useState(defaultValue);

  useEffect(() => setVal(defaultValue), [isReset]);

  const handleChange = ({ target: { value } }) => {
    setVal(+value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let att;
      if (label === "Cell Size") att = "nodeSize";
      else att = label.toLowerCase();
      dispatch(dimensionsChanged({ att, val: +value }));
    }, 100);
  };

  const disabled = isRunning || !runningFunc.category;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: { sm: "row", xs: "column" },
      }}>
      <Box display="flex" width="40%" justifyContent="center">
        <Typography variant="button" sx={{ fontSize: 13, color: "secondary.lighter" }}>
          {label}
        </Typography>
      </Box>

      <Box display="flex" width="70%" justifyContent="center">
        <Slider
          step={1}
          min={min}
          max={max}
          disabled={disabled}
          onChange={handleChange}
          valueLabelDisplay="auto"
          value={val || defaultValue}
          valueLabelFormat={(label) => label + "px"}
          sx={{ width: { sm: "70%", xs: "100%" }, color: "secondary.lighter" }}
        />
      </Box>
    </Box>
  );
};

export default TableSlider;
