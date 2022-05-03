import React from "react";
import { useDispatch } from "react-redux";
import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import AlgosList from "./AlgosList";
import { runtimeChanged } from "../../../store/runtime";
import Logo from "../../common/Logo";

const SideMenu = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      runtimeChanged({ att: "runningFunc", val: { algo: "", type: "", category: "" } })
    );
  }
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        color: "red",
        "& .MuiDrawer-paper": {
          width: ({ custom }) => custom.leftMenuWidth,
          border: 0,
          overflow: "hidden",
        },
      }}>
      <Toolbar
        variant="dense"
        disableGutters
        sx={{
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "secondary.main",
          minHeight: ({ custom }) => custom.topBarHeight,
        }}>
        <Logo handleClick={handleClick} />
      </Toolbar>

      <AlgosList />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bgcolor="primary.light"
        bottom={0}
        p={0.5}
        height="52px"
        width="100%">
        <Typography
          fontWeight="light"
          fontSize={18}
          color="grey.300"
          mt="5px"
          children="©"
        />
        <Typography
          fontWeight="light"
          fontSize={12}
          color="grey.300"
          pl="5px"
          children="Eliya Shalom"
        />
      </Box>
    </Drawer>
  );
};

export default SideMenu;
