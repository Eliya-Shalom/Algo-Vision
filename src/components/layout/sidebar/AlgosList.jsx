import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Box, Collapse, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import TimelineIcon from "@mui/icons-material/Timeline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import SwipeOutlinedIcon from "@mui/icons-material/SwipeOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import CallMergeOutlinedIcon from "@mui/icons-material/CallMergeOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import HighlightAltOutlinedIcon from "@mui/icons-material/HighlightAltOutlined";
import { runtimeChanged, visualizingAborted } from "../../../store/runtime";
import { cleanAndResetGrid, cleanPrevAlgo } from "../../../utils/boardUtils";
import { resetIndicators } from "../../../utils/commonUtils";
import ListButton from "../../common/ListButton";

const styles = {
  icon: { fontSize: 20, ml: 1 },
  subheader: {
    bgcolor: "primary.main",
    color: "grey.500",
    fontSize: 12,
    pl: 1,
  },
};

const AlgosList = () => {
  const dispatch = useDispatch();
  const {
    grid,
    view: { isBorders },
  } = useSelector(({ board }) => board);
  const { runningFunc, dynamicMode, isPainted } = useSelector(({ runtime }) => runtime);
  const [open, setOpen] = useState(false);

  const pathAlgos = [
    { algo: "Dijkstra Algorithm", icon: <OpenWithIcon sx={styles.icon} /> },
    { algo: "Depth-First-Search", icon: <LowPriorityIcon sx={styles.icon} /> },
    { algo: "Breadth-First-Search", icon: <ReadMoreIcon sx={styles.icon} /> },
  ];

  const sortAlgos = [
    { algo: "Quick Sort", icon: <BoltOutlinedIcon sx={styles.icon} /> },
    { algo: "Merge Sort", icon: <CallMergeOutlinedIcon sx={styles.icon} /> },
    { algo: "Heap Sort", icon: <ArrowDropUpOutlinedIcon sx={styles.icon} /> },
    { algo: "Radix Sort", icon: <NumbersOutlinedIcon sx={styles.icon} /> },
    { algo: "Bubble Sort", icon: <BubbleChartOutlinedIcon sx={styles.icon} /> },
    { algo: "Insertion Sort", icon: <HighlightAltOutlinedIcon sx={styles.icon} /> },
    { algo: "Selection Sort", icon: <SwipeOutlinedIcon sx={styles.icon} /> },
  ];

  const setAlgo = (algo, category, heuristic = null) => {
    const { algo: prevAlgo, type: prevHeuristic } = runningFunc;
    if (prevAlgo === algo && prevHeuristic === heuristic) return;

    window.hasAborted = true;

    batch(() => {
      dispatch(visualizingAborted());
      isPainted && resetIndicators(dispatch);

      if (algo === "dynamicMode") {
        dispatch(runtimeChanged({ att: "dynamicMode", val: true }));
        dispatch(
          runtimeChanged({
            att: "runningFunc",
            val: { algo: "aStar", type: "Diagonal", category: "path" },
          })
        );
        algo !== "dynamicMode" &&
          dispatch(
            runtimeChanged({
              att: "runningFunc",
              val: { category: "", algo: "", type: "" },
            })
          );
      } else {
        dispatch(
          runtimeChanged({
            att: "runningFunc",
            val: { category, algo, type: heuristic },
          })
        );
        dynamicMode &&
          dispatch(
            runtimeChanged({
              att: "dynamicMode",
              val: false,
            })
          );
      }
      category === "path" && isPainted && cleanPrevAlgo(grid);
      // cleanAndResetGrid(dispatch, grid, false, false, false, dynamicMode, isBorders);
    });
  };

  return (
    <List>
      <ListItem>
        <ListItemText primary="Path Finding" primaryTypographyProps={styles.subheader} />
      </ListItem>
      <Box>
        <ListButton
          label="A* Algorithm"
          handleClick={() => setOpen(!open)}
          startIcon={<StarBorderIcon sx={styles.icon} />}
          endIcon={
            <KeyboardArrowDown
              sx={{ transform: open ? "rotate(-180deg)" : "rotate(0)" }}
            />
          }
        />
      </Box>

      <Box sx={{ bgcolor: "primary.light", transition: { py: 1 } }}>
        <Collapse in={open}>
          <ListButton
            label="Manhattan Distance"
            handleClick={() => setAlgo("aStar", "path", "Manhattan")}
          />
          <ListButton
            label="Diagonal Distance"
            handleClick={() => setAlgo("aStar", "path", "Diagonal")}
          />
        </Collapse>
      </Box>

      {pathAlgos.map(({ algo, icon }) => (
        <ListButton
          key={algo}
          label={algo}
          startIcon={icon}
          handleClick={() => setAlgo(algo, "path")}
        />
      ))}

      <ListItem>
        <ListItemText primary="Sorting" primaryTypographyProps={styles.subheader} />
      </ListItem>

      {sortAlgos.map(({ algo, icon }) => (
        <ListButton
          key={algo}
          label={algo}
          startIcon={icon}
          handleClick={() => setAlgo(algo, "sort")}
        />
      ))}

      <ListItem>
        <ListItemText
          primary="Special"
          primaryTypographyProps={{ ...styles.subheader, color: "secondary.light" }}
        />
      </ListItem>

      <Tooltip title="Put obstacles/midways points in live mode.">
        <Box>
          <ListButton
            label="Dynamic Path-Finding"
            startIcon={<TimelineIcon sx={{ ...styles.icon, fontSize: 24 }} />}
            handleClick={() => setAlgo("dynamicMode")}
          />
        </Box>
      </Tooltip>
    </List>
  );
};

export default AlgosList;
