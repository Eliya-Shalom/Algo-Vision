import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Box, Collapse, List, Tooltip } from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
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
import { resetIndicators } from "../../../utils/commonUtils";
import { cleanPrevAlgo } from "../../../utils/boardUtils";
import ListButton from "../../common/ListButton";
import ListHeader from "./ListHeader";

const AlgosList = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { runningFunc, dynamicMode, isPainted, midwayActive, mouseChaseActive } =
    useSelector(({ runtime }) => runtime);
  const [open, setOpen] = useState(false);

  const styles = {
    icon: { fontSize: 20 },
  };

  const pathAlgos = [
    { algo: "Dijkstra Algorithm", icon: <ApiIcon sx={styles.icon} /> },
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
      resetIndicators(dispatch);

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
      category === "path" && isPainted && cleanPrevAlgo(grid, dispatch);
      midwayActive && dispatch(runtimeChanged({ att: "midwayActive", val: false }));
      mouseChaseActive &&
        dispatch(runtimeChanged({ att: "mouseChaseActive", val: false }));
    });
  };

  return (
    <List>
      <ListHeader label="Path Finding" />

      <ListButton
        label="A* Algorithm"
        handleClick={() => setOpen(!open)}
        startIcon={<StarBorderIcon sx={styles.icon} />}
        endIcon={
          <KeyboardArrowDown sx={{ transform: open ? "rotate(-180deg)" : "rotate(0)" }} />
        }
      />

      <Collapse in={open}>
        {["Manhattan", "Diagonal"].map((huristic, i) => (
          <ListButton
            key={huristic}
            label={huristic + " Distance"}
            startIcon={
              <OpenWithIcon sx={{ ...styles.icon, transform: i && "rotate(45deg)" }} />
            }
            handleClick={() => setAlgo("aStar", "path", huristic)}
          />
        ))}
      </Collapse>

      {pathAlgos.map(({ algo, icon }) => (
        <ListButton
          key={algo}
          label={algo}
          startIcon={icon}
          handleClick={() => setAlgo(algo, "path")}
        />
      ))}

      <ListHeader label="Sorting" />

      {sortAlgos.map(({ algo, icon }) => (
        <ListButton
          key={algo}
          label={algo}
          startIcon={icon}
          handleClick={() => setAlgo(algo, "sort")}
        />
      ))}

      <ListHeader label="Special" />

      <Tooltip title="Put obstacles/midways points in live mode.">
        <Box>
          <ListButton
            label="Dynamic Path-Finding"
            startIcon={<TimelineIcon sx={{ ...styles.icon, fontSize: 24 }} />}
            handleClick={() => setAlgo("dynamicMode")}
          />
        </Box>
      </Tooltip>
      <Box height="100px" bgcolor="primary.main" />
    </List>
  );
};

export default AlgosList;
