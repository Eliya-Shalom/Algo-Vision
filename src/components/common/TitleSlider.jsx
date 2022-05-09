import { Box, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TitleSlider = ({
  min,
  max,
  step,
  unit,
  label,
  disabled,
  handleChange,
  defaultValue,
}) => {
  const { visualPanel, isMobile } = useSelector(({ ui }) => ui);
  const [val, setVal] = useState(defaultValue);
  useEffect(() => setVal(defaultValue), [visualPanel.isReset]);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={isMobile && "column"}>
      <Typography
        variant="button"
        noWrap={!isMobile}
        sx={{
          width: "30%",
          fontSize: 13,
          textAlign: "center",
          color: "secondary.lighter",
        }}>
        {label}
      </Typography>

      <Box display="flex" width="70%" justifyContent={isMobile ? "center" : "start"}>
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
          sx={{ width: "80%", color: "secondary.lighter" }}
        />
      </Box>
    </Box>
  );
};

export default TitleSlider;
