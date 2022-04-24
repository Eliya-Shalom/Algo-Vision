import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { runtimeChanged } from "../../../store/runtime";

const MidwayBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { midwayActive } = useSelector(({ runtime }) => runtime);

  function handleClick() {
    dispatch(runtimeChanged({ att: "midwayActive", val: !midwayActive }));
  }

  const style = {
    main: { fontSize: 30, transition: "all 0.5s", borderRadius: 50 },
    active: { color: "white", bgcolor: "error.light" },
    notActive: { color: "error.light" },
  };

  return (
    <Tooltip
      title={`When active, new midway nodes can be placed across the grid, to be
       reached by the algorithm. new points can be created before/during the animation.`}>
      <Stack alignItems="center">
        <IconButton sx={{ p: 0 }} onClick={handleClick} disabled={false}>
          <AddLocationIcon
            style={style.main}
            sx={midwayActive ? style.active : style.notActive}
          />
        </IconButton>
        <Typography
          variant="button"
          color="primary.light"
          noWrap
          sx={{ ...typoStyle, fontWeight: midwayActive && "bold" }}
          pt={0.5}
          children="Midway"
        />
      </Stack>
    </Tooltip>
  );
};

export default MidwayBtn;
