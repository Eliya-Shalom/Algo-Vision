import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import TitleIcon from "../../common/TitleIcon";

const Realtime = () => {
  const { realtime } = useSelector(({ ui }) => ui);
  const iconStyle = { color: "secondary.main", fontSize: 30 };
  return (
    <TitleIcon
      Icon={<SpeedIcon sx={iconStyle} />}
      tooltip={
        <Box width="200px">
          <Box textAlign="center">Realtime-Execution</Box>
          <Box extAlign="start">
            How long does it really take for this machine to execute the algorithm.
          </Box>
        </Box>
      }
      label={
        <span id="real-time">
          {realtime}
          <strong style={{ fontSize: 10 }}>ms</strong>
        </span>
      }
    />
  );
};

export default Realtime;
