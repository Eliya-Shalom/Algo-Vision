import React from "react";
import { useSelector } from "react-redux";
import TitleIcon from "../../../common/TitleIcon";

import EqualizerSharpIcon from "@mui/icons-material/EqualizerSharp";

const TotalBars = () => {
  const { axle } = useSelector(({ axle }) => axle);

  const totalNodes = axle.length;

  const icon = <EqualizerSharpIcon sx={{ color: "secondary.main", fontSize: 30 }} />;

  return <TitleIcon icon={icon} label={totalNodes} tooltip="Total-Bars" />;
};

export default TotalBars;
