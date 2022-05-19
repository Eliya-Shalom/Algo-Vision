import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import { Box, Switch, Tooltip, Typography } from "@mui/material";
import { runtimeChanged } from "../../../../store/runtime";

const InstantModeBtn = () => {
  const dispatch = useDispatch();
  const { instantMode, isRunning } = useSelector(({ runtime }) => runtime);

  function handleChange() {
    dispatch(runtimeChanged({ att: "instantMode", val: !instantMode }));
  }

  const styles = {
    icon: {
      p: 0,
      mt: "-2px",
      fontSize: 20,
      borderRadius: "100%",
      transform: "rotate(90deg)",
      position: "relative",
    },
  };

  return (
    <Tooltip title="Instant-Mode (no animation)">
      <Box display="flex" justifyContent="center" mt={1} ml={1} height="100%">
        <Typography
          sx={{ fontSize: 11, lineHeight: 1.4 }}
          variant="button"
          color="inherit"
          textAlign="center">
          {"Instant"} <br /> {"Mode"}
        </Typography>
        <Switch
          size="small"
          color="secondary"
          checked={instantMode}
          onChange={handleChange}
          disabled={isRunning}
          sx={{
            transform: "rotate(90deg)",
            position: "relative",
            ml: -1,
            width: 44,
            bottom: -4,
            "& .MuiSwitch-track": {
              backgroundColor: "secondary.main",
            },
          }}
          icon={
            <BoltSharpIcon
              sx={{
                ...styles.icon,
                color: "warning.main",
                bgcolor: "secondary.main",
              }}
            />
          }
          checkedIcon={
            <BoltSharpIcon
              sx={{
                ...styles.icon,
                color: "secondary.main",
                bgcolor: "warning.main",
              }}
            />
          }
        />
      </Box>
    </Tooltip>
  );
};

export default InstantModeBtn;
