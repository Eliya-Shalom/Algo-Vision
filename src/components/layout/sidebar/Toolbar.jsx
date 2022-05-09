import { Toolbar as MuiToolbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../common/Logo";

const Toolbar = () => {
  const { topBar, sideMenu } = useSelector(({ ui }) => ui);

  return (
    <MuiToolbar
      variant="dense"
      disableGutters
      sx={{
        zIndex: 1,
        display: "flex",
        position: "fixed",
        alignItems: "center",
        transition: "all 0.5s",
        justifyContent: "center",
        bgcolor: "secondary.main",
        height: `${topBar.height}px`,
        minHeight: `${topBar.height}px`,
        width: sideMenu.width + "px",
      }}>
      <Logo />
    </MuiToolbar>
  );
};

export default Toolbar;
