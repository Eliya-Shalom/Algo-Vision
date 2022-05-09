import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, IconButton, Divider, Stack, Box } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Speed = () => {
  const { isMazeRunning, isRunning, dynamicMode } = useSelector(({ runtime }) => runtime);

  const [speed, setSpeed] = useState(1);
  const [scale, setScale] = useState("scale(1)");

  const handleClickUp = () => {
    if (speed === 2) return;
    if (typeof speed !== "string") setSpeed(speed + 0.25);

    setScale("scale(1.5)");
    setTimeout(() => setScale("scale(1)"), 300);
  };

  const handleClickDown = () => {
    if (speed === 0.25) return;
    if (typeof speed !== "string") setSpeed(speed - 0.25);

    setScale("scale(1.5)");
    setTimeout(() => setScale("scale(1)"), 300);
  };

  const getSpeed = () => {
    if (speed === 1 || speed === 2) return `x${speed}.00`;
    else if (speed === 0.5 || speed === 1.5) return `x${speed}0`;
    return "x" + speed;
  };

  const disabled = isMazeRunning || (isRunning && dynamicMode);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: "100%",
        ml: 1,
        mt: 0.5,
      }}>
      <Stack mr={1}>
        <Typography variant="button" color="primary.light" fontSize={11}>
          Speed
        </Typography>
        <Typography
          color="primary.light"
          variant="caption"
          sx={{
            position: "absolute",
            fontSize: 18,
            mt: 2,
            ml: -1,
            transform: scale,
            transition: "1s",
            color: "primary.main",
          }}>
          <span id="speed">{getSpeed()}</span>
        </Typography>
      </Stack>
      <Stack
        sx={{
          width: 22,
          height: 42,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <IconButton
          onClick={handleClickUp}
          disabled={disabled}
          sx={{ width: "100%", height: 20 }}>
          <ArrowDropUpIcon sx={{ color: disabled ? "grey.500" : "secondary.main" }} />
        </IconButton>
        <Divider
          sx={{
            width: 12.5,
            borderBottomWidth: 2,
            borderColor: disabled ? "grey.500" : "secondary.main",
          }}
        />
        <IconButton
          onClick={handleClickDown}
          disabled={disabled}
          sx={{ width: "100%", height: 20 }}>
          <ArrowDropDownIcon sx={{ color: disabled ? "grey.500" : "secondary.main" }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Speed;
