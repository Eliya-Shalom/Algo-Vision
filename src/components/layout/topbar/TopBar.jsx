import React from "react";
import { useSelector } from "react-redux";
import { Box, AppBar, Toolbar } from "@mui/material";
import Timer from "./Timer";
import Speed from "./Speed";
import CodeBtn from "./CodeBtn";
import MazeBtn from "./MazeBtn";
import PlayBtn from "./PlayBtn";
import PauseBtn from "./PauseBtn";
import AbortBtn from "./AbortBtn";
import CleanBtn from "./CleanBtn";
import RealTime from "./RealTime";
import Distance from "./Distance";
import MidwayBtn from "./MidwayBtn";
import ShuffleBtn from "./ShuffleBtn";
import OpsCounter from "./OpsCounter";
import MouseChaseBtn from "./MouseChaseBtn";
import InstantModeBtn from "./InstantModeBtn";
import ProgressBarPath from "./ProgressBarPath";
import ProgressBarSort from "./ProgressBarSort";
import NodesOrSwapsCounter from "./NodesOrSwapsCounter";
import TitleDivider from "../../common/TitleDivider";

const TopBar = () => {
  const { runningFunc, dynamicMode } = useSelector(({ runtime }) => runtime);
  const { category } = runningFunc;
  const typoStyle = {
    fontSize: 11,
    display:
      category === "path" && !dynamicMode
        ? { xs: "none", sm: "none", md: "none", lg: "block", xl: "block" }
        : category === "sort"
        ? { xs: "none", sm: "none", md: "none", lg: "block", xl: "block" }
        : dynamicMode
        ? { xs: "none", sm: "none", md: "none", lg: "block", xl: "block" }
        : { xs: "none", sm: "none", md: "block", lg: "block", xl: "block" },
  };

  const style = {
    px:
      category === "path" && !dynamicMode
        ? { sm: "1vw", md: "0.8vw", lg: "1vw", xl: "1.5vw" }
        : category === "sort"
        ? { sm: "1vw", md: "1vw", lg: "1.5vw", xl: "2vw" }
        : dynamicMode
        ? { sm: "1vw", md: "1.5vw", lg: "2vw", xl: "2.8vw" }
        : { sm: "1vw", md: "1.5vw", lg: "2vw", xl: "2.5vw" },
  };

  const actionItems = [
    <PlayBtn type="Play" typoStyle={typoStyle} />,
    <PauseBtn type="Pause" typoStyle={typoStyle} />,
    <AbortBtn type="Abort" typoStyle={typoStyle} />,
    dynamicMode && <MidwayBtn typoStyle={typoStyle} />,
    dynamicMode && <MouseChaseBtn typoStyle={typoStyle} />,
    category === "path" && !dynamicMode && <MazeBtn typoStyle={typoStyle} />,
    category === "path" && <CleanBtn typoStyle={typoStyle} />,
    category === "sort" && !dynamicMode && <ShuffleBtn typoStyle={typoStyle} />,
  ];

  // const controllers = [
  //   category === "path" && !dynamicMode && <ProgressBarPath />,
  //   category !== "path" && !dynamicMode && <ProgressBarSort />,
  //   <Speed />,
  //   category === "path" && !dynamicMode && <InstantModeBtn typoStyle={typoStyle} />,
  // ];

  const indicators = [
    <Timer />,
    !dynamicMode && <RealTime />,
    !dynamicMode && <OpsCounter />,
    <NodesOrSwapsCounter />,
    category === "path" && !dynamicMode && <Distance />,
  ];

  return (
    <AppBar
      elevation={1}
      position="fixed"
      sx={{
        bgcolor: "white",
        width: ({ custom }) => `calc(100% - ${custom.leftMenuWidth}px)`,
      }}>
      <Toolbar sx={{ height: ({ custom }) => custom.topBarHeight }}>
        <Box display="flex" justifyContent="center" width="100%">
          <TitleDivider title="Actions">
            {actionItems.map((item, idx) => {
              if (!item) return null;
              return <Box key={idx} sx={style} children={item} />;
            })}
          </TitleDivider>

          <TitleDivider title="Controllers">
            {!dynamicMode && (
              <Box width="12.5vw">
                {category === "path" && !dynamicMode && <ProgressBarPath />}
                {category !== "path" && !dynamicMode && <ProgressBarSort />}
              </Box>
            )}
            <Box pl={dynamicMode ? "2vw" : "1.5vw"}>
              <Speed />
            </Box>
            <Box pl="1vw">
              {category === "path" && !dynamicMode && (
                <InstantModeBtn typoStyle={typoStyle} />
              )}
            </Box>
          </TitleDivider>

          <TitleDivider title="Indicators">
            {indicators.map((item, idx) => {
              if (!item) return null;
              return <Box key={idx} sx={style} children={item} />;
            })}
          </TitleDivider>
        </Box>

        <CodeBtn typoStyle={typoStyle} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
