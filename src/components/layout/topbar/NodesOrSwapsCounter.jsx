import React from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import TitleIcon from "../../common/TitleIcon";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";

const NodesOrSwapsCounter = () => {
  const [category] = useGetCategoryAndAlgo();

  const iconStyle = { color: "secondary.main", fontSize: 30 };
  const tooltip = category === "path" ? "Visited-Nodes" : "Swaps";
  const icon =
    category === "path" ? (
      <CheckCircleOutlineRoundedIcon sx={iconStyle} />
    ) : (
      <CompareArrowsIcon sx={iconStyle} />
    );

  return (
    <TitleIcon
      icon={icon}
      label={<span id="nodes-or-swaps-counter">0</span>}
      tooltip={tooltip}
    />
  );
};

export default NodesOrSwapsCounter;
