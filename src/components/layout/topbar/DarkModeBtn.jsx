import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiChanged } from "../../../store/ui";
import { grey } from "@mui/material/colors";

const DarkModeBtn = () => {
  const dispatch = useDispatch();
  const { colorMode: currentMode } = useSelector(({ ui }) => ui);
  const nextMode = currentMode === "light" ? "dark" : "light";

  function handleClick() {
    dispatch(uiChanged({ att: "colorMode", val: nextMode }));
  }

  return (
    <Tooltip title={`${nextMode[0].toUpperCase() + nextMode.slice(1)}-Mode`}>
      <Box
        sx={{
          bgcolor: currentMode === "light" ? "secondary.main" : grey[300],
          position: "fixed",
          right: 0,
          top: 0,
          borderBottomLeftRadius: 100,
          height: 32.5,
          width: 32.5,
        }}>
        <Box sx={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton
            onClick={handleClick}
            sx={{ p: 0, color: currentMode === "light" ? "white" : "secondary.main" }}>
            {currentMode === "light" ? (
              <NightlightIcon sx={{ fontSize: 21 }} />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default DarkModeBtn;

/*
   <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: size,
        height: size,
      }}>
      <Box
        sx={{
          position: "absolute",
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: `${size}px ${size}px 0px 0px`,
          borderColor: "transparent transparent transparent transparent",
          borderTopColor: "secondary.main",
          transform: "rotate(90deg)",
        }}
      />
      <Box sx={{ position: "absolute", right: 0, top: 0 }}>
        <IconButton sx={{ p: 0, color: "white" }}>
          {colorMode === "light" ? (
            <NightlightIcon sx={{ fontSize: 20 }} />
          ) : (
            <LightModeIcon />
          )}
        </IconButton>
      </Box>
    </Box>
*/
