import React from "react";
import { useSelector } from "react-redux";
import { Stack, Tooltip, Typography } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";

const Realtime = () => {
  const { realtime } = useSelector(({ runtime }) => runtime);

  return (
    <Stack alignItems="center">
      <Tooltip
        title={
          <div style={{ width: 210 }}>
            <div style={{ textAlign: "center" }}>Realtime-Execution</div>
            <div style={{ textAlign: "start" }}>
              How much time it really takes for this machine to execute the algorithm.
            </div>
          </div>
        }>
        <SpeedIcon sx={{ color: "secondary.main", fontSize: 30 }} />
      </Tooltip>

      <Typography color="primary.light" variant="button" pt={0.5}>
        <span id="real-time">
          {realtime}
          <strong style={{ fontSize: 10 }}>ms</strong>
        </span>
      </Typography>
    </Stack>
  );
};

export default Realtime;
