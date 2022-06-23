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
import ListHeader from "./ListHeader";
import ListButton from "../../common/ListButton";
import { shuffleAxle } from "../../../utils/axleUtils";
import { cleanPrevAlgo } from "../../../utils/boardUtils";
import { resetIndicators } from "../../../utils/commonUtils";
import { axleChanged } from "../../../store/axle";
import { runtimeChanged, snapshotTook, visualizingAborted } from "../../../store/runtime";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";

const AlgosList = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { axle } = useSelector(({ axle }) => axle);
  const { isPainted, midwayActive, mouseChaseActive } = useSelector(
    ({ runtime }) => runtime
  );
  const [category] = useGetCategoryAndAlgo();

  const [open, setOpen] = useState(false);

  const styles = { icon: { fontSize: 20 } };

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

  const prepareAlgo = (label) => {
    if (label === "A*-Algorithm") return;

    window.hasAborted = true;
    window.snapshot.path = { visited: [], path: [], indices: [0, 0] };

    batch(() => {
      dispatch(visualizingAborted());
      resetIndicators(dispatch);

      if (category === "Sorting" && isPainted) {
        const shuffledAxle = shuffleAxle(axle);
        dispatch(axleChanged({ att: "axle", val: shuffledAxle }));
        dispatch(snapshotTook({ category: "sort", val: { swaps: [], idx: 0 } }));
        dispatch(runtimeChanged({ att: "isPainted", val: false }));
      }

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
        {["Manhattan", "Diagonal"].map((heuristic, i) => (
          <ListButton
            key={heuristic}
            label={heuristic + "-Distance"}
            startIcon={
              <OpenWithIcon sx={{ ...styles.icon, transform: i && "rotate(45deg)" }} />
            }
            handleClick={prepareAlgo}
          />
        ))}
      </Collapse>

      {pathAlgos.map(({ algo, icon }) => (
        <ListButton key={algo} label={algo} startIcon={icon} handleClick={prepareAlgo} />
      ))}

      <ListHeader label="Sorting" />

      {sortAlgos.map(({ algo, icon }) => (
        <ListButton key={algo} label={algo} startIcon={icon} handleClick={prepareAlgo} />
      ))}

      <ListHeader label="Special" />

      <Tooltip title="Put obstacles/midways points in live mode.">
        <Box>
          <ListButton
            label="Dynamic-Path-finding"
            startIcon={<TimelineIcon sx={{ ...styles.icon, fontSize: 24 }} />}
            handleClick={prepareAlgo}
          />
        </Box>
      </Tooltip>
      <Box height="100px" bgcolor="primary.main" />
    </List>
  );
};

export default AlgosList;
