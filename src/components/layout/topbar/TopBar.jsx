import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Grid, Divider, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import SnippetBtn from "./SnippetBtn";
import DarkModeBtn from "./DarkModeBtn";

import MazeBtn from "./action-buttons/MazeBtn";
import PlayBtn from "./action-buttons/PlayBtn";
import PauseBtn from "./action-buttons/PauseBtn";
import AbortBtn from "./action-buttons/AbortBtn";
import CleanBtn from "./action-buttons/CleanBtn";
import MidwayBtn from "./action-buttons/MidwayBtn";
import WeightBtn from "./action-buttons/WeightBtn";
import ShuffleBtn from "./action-buttons/ShuffleBtn";
import MouseChaseBtn from "./action-buttons/MouseChaseBtn";

import Speed from "./controllers/Speed";
import ProgressBarPath from "./controllers/ProgressBarPath";
import ProgressBarSort from "./controllers/ProgressBarSort";
import InstantModeBtn from "./controllers/InstantModeBtn";

import Timer from "./indicators/Timer";
import Realtime from "./indicators/Realtime";
import Distance from "./indicators/Distance";
import TotalBars from "./indicators/TotalBars";
import OpsCounter from "./indicators/OpsCounter";
import TotalNodes from "./indicators/TotalNodes";
import NodesOrSwapsCounter from "./indicators/NodesOrSwapsCounter";

import TitleDivider from "../../common/TitleDivider";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";

const TopBar = () => {
  const { sideMenu, topBar, isMobile } = useSelector(({ ui }) => ui);
  const [category, algo] = useGetCategoryAndAlgo();

  const { custom } = useTheme();

  const dynamicMode = algo === "Dynamic-Path-finding";

  const styles = {
    appBar: {
      display: "flex",
      position: "fixed",
      width: `calc(100% - ${sideMenu.width}px)`,
      height: `${topBar.height}px`,
      bgcolor: custom.topBar.background,
      color: custom.topBar.textColor,
      transition: "all 0.3s",
    },
    gridContainer: {
      display: "flex",
      flexWrap: "nowrap",
      pt: isMobile && 1,
      width: { md: "100%", sm: "fit-content" },
      overflowX: topBar.overflow,
      overflowY: "hidden",
    },
    gridItem: {
      display: { md: "initial", sm: "flex" },
      justifyContent: "center",
      alignItems: "start",
      minWidth: "fit-content",
      height: `${topBar.height}px`,
    },
  };

  const actionItems = [
    <PlayBtn type="Play" />,
    <PauseBtn type="Pause" />,
    <AbortBtn type="Abort" />,
    dynamicMode && <MidwayBtn />,
    dynamicMode && !isMobile && <MouseChaseBtn />,
    category === "Path-finding" && !dynamicMode && <MazeBtn />,
    category === "Path-finding" && <CleanBtn />,
    category === "Path-finding" && !dynamicMode && <WeightBtn />,
    category === "Sorting" && !dynamicMode && <ShuffleBtn />,
  ];

  const indicatorsItems = [
    <Timer />,
    !dynamicMode && <Realtime />,
    !dynamicMode && <OpsCounter />,
    <NodesOrSwapsCounter />,
    category === "Path-finding" && !dynamicMode && <Distance />,
    category === "Path-finding" && <TotalNodes />,
    category === "Sorting" && <TotalBars />,
  ];

  const controllersItems = [
    category === "Path-finding" && !dynamicMode && <ProgressBarPath />,
    category !== "Path-finding" && !dynamicMode && <ProgressBarSort />,
    <Speed />,
    category === "Path-finding" && !dynamicMode && <InstantModeBtn />,
  ];

  const toRender = {
    actions: actionItems.filter((item) => item),
    indicators: indicatorsItems.filter((item) => item),
    controllers: controllersItems.filter((item) => item),
  };
  const len =
    toRender.actions.length + toRender.indicators.length + toRender.controllers.length;
  const xs = 12 / len;

  const divider = isMobile && (
    <Box display="flex" px={1}>
      <Divider orientation="vertical" variant="middle" flexItem px={1} />
    </Box>
  );

  return (
    <AppBar elevation={1} sx={styles.appBar}>
      <Toolbar sx={{ minHeight: `${topBar.height}px !important` }} disableGutters>
        <Grid container sx={styles.gridContainer}>
          <Grid item xs={xs * toRender.actions.length} sx={styles.gridItem}>
            <TitleDivider title="Actions">
              <Grid container justifyContent="center">
                {toRender.actions.map((item, idx) => (
                  <Grid item xs={12 / toRender.actions.length} key={idx}>
                    {item}
                  </Grid>
                ))}
              </Grid>
            </TitleDivider>
          </Grid>

          {divider}

          <Grid
            item
            xs={xs * (toRender.controllers.length * 2)}
            sx={styles.gridItem}
            height="100%">
            <TitleDivider title="Controllers">
              {toRender.controllers.map((item, idx) => {
                const thisLen = toRender.controllers.length;
                return (
                  <Grid
                    item
                    xs={idx === 0 && thisLen >= 2 ? 7 : true}
                    key={idx}
                    height="100%">
                    {item}
                  </Grid>
                );
              })}
            </TitleDivider>
          </Grid>

          {divider}

          <Grid item xs={xs * toRender.indicators.length} sx={styles.gridItem}>
            <TitleDivider title="Indicators">
              <Grid container justifyContent="center">
                {toRender.indicators.map((item, idx) => (
                  <Grid item xs={12 / toRender.indicators.length} key={idx}>
                    {item}
                  </Grid>
                ))}
              </Grid>
            </TitleDivider>
          </Grid>

          {divider}

          <Grid item xs alignSelf="center" mr={1}>
            <SnippetBtn />
          </Grid>
        </Grid>
        <DarkModeBtn />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
