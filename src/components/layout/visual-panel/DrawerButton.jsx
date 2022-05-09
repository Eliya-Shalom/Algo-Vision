import React from "react";
import { useSelector } from "react-redux";
import { Box, ButtonBase, Typography } from "@mui/material";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

const DrawerButton = ({ open, setOpen }) => {
  const { visualPanel, sideMenu, isMobile } = useSelector(({ ui }) => ui);
  const { drawerHeight, panelHeight } = visualPanel;

  return (
    <ButtonBase
      sx={{
        position: "fixed",
        right: 0,
        bottom: -1,
        height: panelHeight,
        width: `calc(100% - ${sideMenu.width}px)`,
        bgcolor: "#40367d",
        mb: open ? `${drawerHeight - 5}px` : "0px",
        zIndex: 110,
        transition: "all 0.5s",
      }}
      onClick={() => setOpen(!open)}>
      <Box display="flex" alignItems="center" height={panelHeight}>
        <DisplaySettingsIcon
          sx={{ color: "secondary.lighter", fontSize: isMobile ? 22 : 30, mr: 1 }}
        />
        <Typography
          variant="button"
          sx={{ fontSize: isMobile ? 11 : 13, color: "grey.300", pr: 3 }}>
          Visual Settings
        </Typography>
        <KeyboardArrowUp
          sx={{
            color: "secondary.lighter",
            fontSize: isMobile ? 24 : 30,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "0.3s",
          }}
        />
      </Box>
    </ButtonBase>
  );
};

export default DrawerButton;
