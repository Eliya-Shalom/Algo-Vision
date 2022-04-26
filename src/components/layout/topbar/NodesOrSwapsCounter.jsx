import React from "react";
import { useSelector } from "react-redux";
import { Stack, Tooltip, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const NodesOrSwapsCounter = () => {
  const { runningFunc, dynamicMode } = useSelector(({ runtime }) => runtime);

  const Icon = ({ category, style }) => {
    return (
      <Tooltip title={category === "path" ? "Visited-Nodes" : "Swaps"}>
        {category === "path" || dynamicMode ? (
          <CheckCircleOutlineRoundedIcon sx={style} />
        ) : (
          <CompareArrowsIcon sx={style} />
        )}
      </Tooltip>
    );
  };

  return (
    <Stack alignItems="center">
      <Icon
        category={runningFunc.category}
        style={{ color: "secondary.main", fontSize: 30 }}
      />

      <Typography
        color="primary.light"
        variant="button"
        textAlign="center"
        sx={{ minWidth: 55 }}
        pt={0.5}>
        <span id="nodes-or-swaps-counter">0</span>
      </Typography>
    </Stack>
  );
};

export default NodesOrSwapsCounter;
