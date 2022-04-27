import React from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

const ActionBtn = ({
  label,
  children,
  disabled,
  handleClick,
  typoStyle,
  tooltip = "",
}) => {
  return (
    <Tooltip title={tooltip}>
      <Stack alignItems="center" justifyContent="center">
        <IconButton sx={{ p: 0 }} disabled={disabled} onClick={handleClick}>
          {children}
        </IconButton>
        <Typography variant="button" color="primary.light" noWrap sx={typoStyle} pt={0.5}>
          {label}
        </Typography>
      </Stack>
    </Tooltip>
  );
};

export default ActionBtn;
