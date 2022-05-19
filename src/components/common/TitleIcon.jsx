import React from "react";
import { Stack, Tooltip, Typography } from "@mui/material";

const TitleIcon = ({ icon, tooltip, label }) => {
  return (
    <Tooltip title={tooltip}>
      <Stack alignItems="center" px={0.5} sx={{ cursor: "help" }}>
        {icon}
        <Typography
          color="inherit"
          variant="button"
          textAlign="center"
          children={label}
          sx={{ minWidth: 55, pt: 0.25, fontSize: 13 }}
        />
      </Stack>
    </Tooltip>
  );
};

export default TitleIcon;
