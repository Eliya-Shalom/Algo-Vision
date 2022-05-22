import React from "react";
import { useSelector } from "react-redux";
import { Box, Drawer } from "@mui/material";
import AlgosList from "./AlgosList";
import Credit from "./Credit";
import Toolbar from "./Toolbar";

const SideMenu = () => {
  const { sideMenu, topBar } = useSelector(({ ui }) => ui);

  return (
    <Drawer
      id="sideMenu"
      anchor="left"
      variant="permanent"
      ModalProps={{ keepMounted: true }}
      sx={{
        color: "red",
        "& .MuiDrawer-paper": {
          border: 0,
          width: sideMenu.width,
          height: `calc(100% - ${sideMenu.creditHeight}px)`,
          transition: "width 0.3s",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      }}>
      <Toolbar />
      <Box mb={topBar.height + "px"} />
      <AlgosList />
      <Credit />
    </Drawer>
  );
};

export default SideMenu;
