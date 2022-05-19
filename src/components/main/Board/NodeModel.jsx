import { useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "./Node.css";

const Node = (props) => {
  const { row, col, id } = props;
  const { grid, dimensions } = useSelector(({ board }) => board);
  const { custom } = useTheme();

  const isStart = row === 2 && col === 2;
  const isFinish = row === grid.length - 3 && col === grid[0].length - 3;
  const edgeWalls =
    row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1;
  const className = isStart ? "start" : isFinish ? "finish" : edgeWalls ? "wall" : "node";

  return (
    <td
      id={id}
      className={className}
      style={{
        width: dimensions.nodeSize,
        height: dimensions.nodeSize,
        backgroundColor: !isStart && !isFinish && custom.node.color,
        outline: "0.5px solid rgba(179, 179, 179, .5)",
        userSelect: "none",
      }}
    />
  );
};

export default Node;
