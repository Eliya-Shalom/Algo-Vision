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
      <Stack px={1} alignItems="center">
        <IconButton sx={{ p: 0 }} disabled={disabled} onClick={handleClick}>
          {children}
        </IconButton>
        <Typography
          variant="button"
          color="primary.light"
          noWrap
          children={label}
          sx={{ ...typoStyle, pt: 0.5, fontSize: 11 }}
        />
      </Stack>
    </Tooltip>
  );
};

export default ActionBtn;
