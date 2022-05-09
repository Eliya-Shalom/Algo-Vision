import React from "react";
import { useSelector } from "react-redux";
import { Stack, Tooltip, Typography } from "@mui/material";

const TitleIcon = ({ icon, tooltip, label }) => {
  const { isMobile } = useSelector(({ ui }) => ui);

  return (
    <Stack alignItems="center" px={0.5}>
      <Tooltip title={tooltip}>{icon}</Tooltip>
      <Typography
        color="primary.light"
        variant="button"
        textAlign="center"
        children={label}
        sx={{ minWidth: 55, pt: 0.25, fontSize: 13 }}
      />
    </Stack>
  );
};

export default TitleIcon;
