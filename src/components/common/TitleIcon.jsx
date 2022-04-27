import { Stack, Tooltip, Typography } from "@mui/material";
import React from "react";

const TitleIcon = ({ Icon, tooltip, label }) => {
  return (
    <Stack alignItems="center">
      <Tooltip title={tooltip}>{Icon}</Tooltip>
      {/* <Tooltip title="" ><span></span></Tooltip> */}
      <Typography
        sx={{ minWidth: 55 }}
        color="primary.light"
        variant="button"
        textAlign="center"
        pt={0.5}>
        <div>{label}</div>
      </Typography>
    </Stack>
  );
};

export default TitleIcon;
