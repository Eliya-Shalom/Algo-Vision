import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MouseIcon from "@mui/icons-material/Mouse";
import { runtimeChanged } from "../../../store/runtime";

const MouseChaseBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { mouseChaseActive } = useSelector(({ runtime }) => runtime);

  function handleClick() {
    dispatch(runtimeChanged({ att: "mouseChaseActive", val: !mouseChaseActive }));
  }

  const style = {
    main: { padding: "2px", fontSize: 30, transition: "all 0.5s", borderRadius: 50 },
    active: { color: "white", bgcolor: "info.main" },
    notActive: { color: "info.main" },
  };

  return (
    <Tooltip title={`When active, the algorithm will chase after the user mouse.
    walls/midway points can be created while active.`}>
      <Stack alignItems="center">
        <IconButton sx={{ p: 0 }} onClick={handleClick} disabled={false}>
          <MouseIcon
            style={style.main}
            sx={mouseChaseActive ? style.active : style.notActive}
          />
        </IconButton>
        <Typography
          variant="button"
          color="primary.light"
          noWrap
          sx={{ ...typoStyle, fontWeight: mouseChaseActive && "bold" }}
          pt={0.5}
          children="Chase"
        />
      </Stack>
    </Tooltip>
  );
};

export default MouseChaseBtn;
