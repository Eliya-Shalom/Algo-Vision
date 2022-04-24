import React from "react";
import { useDispatch } from "react-redux";
import { Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import AlgosList from "./AlgosList";
import { runtimeChanged } from "../../../store/runtime";

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
        <Typography variant="h5" color="white" sx={{ fontSize: 34, mr: 0.5 }}>
          <sup>
            <ins style={{ fontWeight: 200, fontSize: 22 }}>Algo</ins>
          </sup>
          <strong style={{ fontSize: 34 }}>Vision</strong>
        </Typography>
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <FitbitIcon sx={{ color: "white", fontSize: 50 }} />
        </IconButton>
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
        width="100%"
      >
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
