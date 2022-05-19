import React from "react";
import { useSelector } from "react-redux";
import TitleIcon from "../../../common/TitleIcon";

import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";

const TotalNodes = () => {
  const { grid } = useSelector(({ board }) => board);
  const totalNodes = grid ? grid.length * grid[0].length : 0;
  const tooltip = (
    <div style={{ maxWidth: 210 }}>
      <div style={{ textAlign: "center" }}>Total-Nodes</div>
      <div style={{ textAlign: "center" }}>{`${grid[0].length} x ${grid.length}`}</div>
    </div>
  );
  const icon = <GridOnOutlinedIcon sx={{ color: "secondary.main", fontSize: 30 }} />;

  return <TitleIcon icon={icon} label={totalNodes} tooltip={tooltip} />;
};

export default TotalNodes;
