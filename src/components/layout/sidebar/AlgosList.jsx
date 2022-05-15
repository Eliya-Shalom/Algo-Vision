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
import { runtimeChanged, snapshotTook, visualizingAborted } from "../../../store/runtime";
import ListHeader from "./ListHeader";
import { resetIndicators } from "../../../utils/commonUtils";
import { cleanPrevAlgo } from "../../../utils/boardUtils";
import ListButton from "../../common/ListButton";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";
import { axleChanged } from "../../../store/axle";
import { shuffleAxle } from "../../../utils/axleUtils";

const AlgosList = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { axle } = useSelector(({ axle }) => axle);
  const { isPainted, midwayActive, mouseChaseActive } = useSelector(
    ({ runtime }) => runtime
  );
  const [category] = useGetCategoryAndAlgo();

  const [open, setOpen] = useState(false);

  const styles = {
    icon: { fontSize: 20 },
  };

  const pathAlgos = [
    { algo: "Dijkstra-Algorithm", icon: <ApiIcon sx={styles.icon} /> },
    { algo: "Depth-First-Search", icon: <LowPriorityIcon sx={styles.icon} /> },
    { algo: "Breadth-First-Search", icon: <ReadMoreIcon sx={styles.icon} /> },
  ];

  const sortAlgos = [
    { algo: "Quick-Sort", icon: <BoltOutlinedIcon sx={styles.icon} /> },
    { algo: "Merge-Sort", icon: <CallMergeOutlinedIcon sx={styles.icon} /> },
    { algo: "Heap-Sort", icon: <ArrowDropUpOutlinedIcon sx={styles.icon} /> },
    { algo: "Radix-Sort", icon: <NumbersOutlinedIcon sx={styles.icon} /> },
    { algo: "Bubble-Sort", icon: <BubbleChartOutlinedIcon sx={styles.icon} /> },
    { algo: "Insertion-Sort", icon: <HighlightAltOutlinedIcon sx={styles.icon} /> },
    { algo: "Selection-Sort", icon: <SwipeOutlinedIcon sx={styles.icon} /> },
  ];

  const setAlgo = (label) => {
    if (label === "A*-Algorithm") return;

    window.hasAborted = true;
    window.snapshot.path = { visited: [], path: [], indices: [0, 0] };

    batch(() => {
      if (category === "Sorting" && isPainted) {
        const shuffledAxle = shuffleAxle(axle);
        dispatch(axleChanged({ att: "axle", val: shuffledAxle }));
        dispatch(snapshotTook({ category: "sort", val: { swaps: [], idx: 0 } }));
        dispatch(runtimeChanged({ att: "isPainted", val: false }));
      }
      dispatch(visualizingAborted());
      resetIndicators(dispatch);

      category === "Path-finding" && isPainted && cleanPrevAlgo(grid, dispatch);
      midwayActive && dispatch(runtimeChanged({ att: "midwayActive", val: false }));
      mouseChaseActive &&
        dispatch(runtimeChanged({ att: "mouseChaseActive", val: false }));
    });
  };

  return (
    <List>
      <ListHeader label="Path-finding" />

      <ListButton
        label="A*-Algorithm"
        startIcon={<StarBorderIcon sx={styles.icon} />}
        handleClick={() => setOpen(!open)}
        endIcon={
          <KeyboardArrowDown sx={{ transform: open ? "rotate(-180deg)" : "rotate(0)" }} />
        }
      />

      <Collapse in={open}>
        {["Manhattan", "Diagonal"].map((huristic, i) => (
          <ListButton
            key={huristic}
            label={huristic + "-Distance"}
            startIcon={
              <OpenWithIcon sx={{ ...styles.icon, transform: i && "rotate(45deg)" }} />
            }
            handleClick={setAlgo}
          />
        ))}
      </Collapse>

      {pathAlgos.map(({ algo, icon }) => (
        <ListButton key={algo} label={algo} startIcon={icon} handleClick={setAlgo} />
      ))}

      <ListHeader label="Sorting" />

      {sortAlgos.map(({ algo, icon }) => (
        <ListButton key={algo} label={algo} startIcon={icon} handleClick={setAlgo} />
      ))}

      <ListHeader label="Special" />

      <Tooltip title="Put obstacles/midways points in live mode.">
        <Box>
          <ListButton
            label="Dynamic-Path-finding"
            startIcon={<TimelineIcon sx={{ ...styles.icon, fontSize: 24 }} />}
            handleClick={setAlgo}
          />
        </Box>
      </Tooltip>
      <Box height="100px" bgcolor="primary.main" />
    </List>
  );
};

export default AlgosList;
