import React from "react";
import { useSelector } from "react-redux";
import { Stack, Tooltip, Typography } from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";

const Distance = () => {
  const { distance } = useSelector(({ runtime }) => runtime);

  return (
    <Stack alignItems="center">
      <Tooltip
        title={
          <div style={{ width: 210 }}>
            <div style={{ textAlign: "center" }}>Distance</div>
            <div style={{ textAlign: "start" }}>
              The distance between Start and Finish nodes.
            </div>
          </div>
        }>
        <RouteIcon sx={{ color: "secondary.main", fontSize: 30 }} />
      </Tooltip>

      <Typography color="primary.light" variant="button" noWrap pt={0.5}>
        {distance}
      </Typography>
    </Stack>
  );
};

export default Distance;
