import { Box, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TitleSlider = ({
  min,
  max,
  step,
  handleChange,
  defaultValue,
  label,
  unit,
  disabled,
}) => {
  const { isReset } = useSelector(({ board }) => board.view);
  const [val, setVal] = useState(defaultValue);
  useEffect(() => setVal(defaultValue), [isReset]);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      sx={{ flexDirection: { md: "row", sm: "row", xs: "column" } }}>
      <Box display="flex" width="30%" justifyContent="center">
        <Typography
          variant="button"
          sx={{ fontSize: 13, color: "secondary.lighter" }}
          noWrap>
          {label}
        </Typography>
      </Box>

      <Box display="flex" width="70%" justifyContent="start">
        <Slider
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            handleChange(e, label);
            setVal(+e.target.value);
          }}
          disabled={disabled}
          valueLabelDisplay="auto"
          value={val || defaultValue}
          valueLabelFormat={(label) => label + unit}
          sx={{ width: { sm: "70%", xs: "100%" }, color: "secondary.lighter" }}
        />
      </Box>
    </Box>
  );
};

export default TitleSlider;
