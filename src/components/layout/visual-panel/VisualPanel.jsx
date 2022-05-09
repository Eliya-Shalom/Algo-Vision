import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Drawer, Divider, Box } from "@mui/material";
import ThreeDView from "./ThreeDView";
import TableView from "./TableView";
import AxleView from "./AxleView";
import DrawerButton from "./DrawerButton";
import ResetButton from "./ResetButton";

const VisualPanel = () => {
  const { isMobile, sideMenu, visualPanel } = useSelector(({ ui }) => ui);
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);

  const [open, setOpen] = useState(false);

  const styles = {
    drawer: {
      "& .MuiDrawer-paper": {
        border: 0,
        bottom: -1,
        bgcolor: "#40367d",
        width: `calc(100% - ${sideMenu.width}px)`,
        ml: sideMenu.width + "px",
        maxHeight: open ? visualPanel.drawerHeight : "0%",
        overflow: !isMobile && "hidden",
        transition: "all 0.5s",
        zIndex: 109,
      },
    },
    gridContainer: {
      bgcolor: "secondary.dark",
      display: "flex",
      flexDirection: isMobile ? "column-reverse" : "row",
    },
    gridItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      py: 4,
      pl: 0,
    },
  };

  return (
    <Box sx={{ width: "100%", zIndex: 100, bgcolor: "red" }}>
      <DrawerButton open={open} setOpen={setOpen} />
      <Drawer anchor="bottom" variant="permanent" sx={styles.drawer}>
        <Grid container sx={styles.gridContainer}>
          {isMobile && <ResetButton />}
          <Grid item xs sx={styles.gridItem}>
            <ThreeDView />
          </Grid>

          {!isMobile && <ResetButton />}
          {isMobile && <Divider variant="middle" sx={{ mb: 2, mt: -3 }} />}

          <Grid item xs sx={styles.gridItem}>
            {category !== "sort" && <TableView />}
            {category === "sort" && <AxleView />}
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
};

export default VisualPanel;
