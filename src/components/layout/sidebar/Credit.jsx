import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const Credit = () => {
  const { sideMenu, visualPanel } = useSelector(({ ui }) => ui);

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: visualPanel.panelHeight,
        width: sideMenu.width,
        bgcolor: "primary.light",
        p: 0.5,
        left: 0,
        bottom: 0,
        transition: "width 0.5s",
        overflow: "hidden",
      }}>
      <Typography
        fontWeight="light"
        fontSize={18}
        color="grey.300"
        mt="5px"
        children="©"
      />
      {sideMenu.open && (
        <Typography
          fontWeight="light"
          fontSize={12}
          noWrap
          color="grey.300"
          pl="5px"
          textAlign="center"
          children="Eliya Shalom"
        />
      )}
    </Box>
  );
};

export default Credit;
