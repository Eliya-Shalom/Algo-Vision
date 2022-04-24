import React from "react";
import { Stack, Tooltip, Typography } from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

const OpsCounter = () => {
  return (
    <Stack alignItems="center">
      <Tooltip
        title={
          <div style={{ width: 210 }}>
            <div style={{ textAlign: "center" }}>Operations-Counter</div>
            <div style={{ textAlign: "start" }}>
              (loops, arrays accesses, comparisons, recursive calls, etc).
            </div>
          </div>
        }>
        <AssessmentOutlinedIcon sx={{ color: "secondary.main", fontSize: 30 }} />
      </Tooltip>

      <Typography color="primary.light" variant="button" noWrap pt={0.5}>
        <span id="ops-counter">0</span>
      </Typography>
    </Stack>
  );
};

export default OpsCounter;
