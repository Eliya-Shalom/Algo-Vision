import React from "react";
import { useSelector } from "react-redux";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import TitleIcon from "../../common/TitleIcon";

const NodesOrSwapsCounter = () => {
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);

  const iconStyle = { color: "secondary.main", fontSize: 30 };
  const tooltip = category === "path" ? "Visited-Nodes" : "Swaps";
  const Icon =
    category === "path" ? (
      <CheckCircleOutlineRoundedIcon sx={iconStyle} />
    ) : (
      <CompareArrowsIcon sx={iconStyle} />
    );

  return (
    <TitleIcon
      Icon={Icon}
      label={<span id="nodes-or-swaps-counter">0</span>}
      tooltip={tooltip}
    />
  );
};

export default NodesOrSwapsCounter;
