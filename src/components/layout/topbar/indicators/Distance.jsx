import React from "react";
import { useSelector } from "react-redux";
import RouteIcon from "@mui/icons-material/Route";
import TitleIcon from "../../../common/TitleIcon";

const Distance = () => {
  const { distance } = useSelector(({ ui }) => ui.topBar);

  const tooltip = (
    <div style={{ width: 210 }}>
      <div style={{ textAlign: "center" }}>Distance</div>
      <div style={{ textAlign: "start" }}>
        The distance between Start and Finish nodes.
      </div>
    </div>
  );
  const icon = <RouteIcon sx={{ color: "secondary.main", fontSize: 30 }} />;

  return <TitleIcon icon={icon} label={distance} tooltip={tooltip} />;
};

export default Distance;
