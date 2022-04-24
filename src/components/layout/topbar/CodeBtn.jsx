import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { uiChanged } from "../../../store/ui";

window.hasPaused = false;

const PauseBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { algo } = useSelector(({ runtime }) => runtime.runningFunc);

  function handleClick() {
    dispatch(uiChanged({ att: "isSnippetOpen", val: true }));
  }

  return (
    <Tooltip
      title={` ${
        algo === "aStar" ? "A* Algorithm" : algo ? algo : "Algorithm's"
      } implementation in JavaScript`}>
      <Stack justifyContent="center" alignItems="center">
        <IconButton
          sx={{ p: 0, width: 45, height: 45 }}
          onClick={handleClick}
          children={<CodeIcon sx={{ fontSize: 30, color: "secondary.main" }} />}
        />
        <Typography
          variant="button"
          color="primary.light"
          children={"Source-Code"}
          noWrap
          sx={typoStyle}
          pt={0.5}
          fontSize={12}
        />
      </Stack>
    </Tooltip>
  );
};

export default PauseBtn;
