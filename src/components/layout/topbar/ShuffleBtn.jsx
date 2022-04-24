import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { axleChanged } from "../../../store/axle";
import { runtimeChanged, snapshotTook } from "../../../store/runtime";
import { animateShuffleAxle } from "../../../utils/axleUtils";
import { resetIndicators } from "../../../utils/commonUtils";

const ShuffleBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { isRunning, isShuffling, isDone } = useSelector(({ runtime }) => runtime);
  const { axle } = useSelector(({ axle }) => axle);
  const [deg, setDeg] = useState(720);

  async function handleClick() {
    setDeg(deg + 720);

    batch(() => {
      resetIndicators(dispatch);
      dispatch(runtimeChanged({ att: "isShuffling", val: true }));
      isDone && dispatch(runtimeChanged({ att: "isDone", val: false }));
    });

    const shuffled = await animateShuffleAxle(axle);

    batch(() => {
      dispatch(axleChanged({ att: "axle", val: shuffled }));
      dispatch(snapshotTook({ category: "sort", val: { swaps: [], idx: 0 } }));
      dispatch(runtimeChanged({ category: "sort", att: "isShuffling", val: false }));
    });
  }

  return (
    <Tooltip title="Shuffle Axle">
      <Stack>
        <IconButton
          disabled={isRunning || isShuffling}
          onClick={handleClick}
          sx={{ p: 0 }}>
          <ShuffleIcon
            id="rotate"
            sx={{
              fontSize: 30,
              transform: `rotate(-${deg}deg)`,
              transition: "transform 1.5s",
              color: isRunning || isShuffling ? "grey.300" : "secondary.main",
            }}
          />
        </IconButton>
        <Typography variant="button" color="primary.light" noWrap sx={typoStyle} pt={0.5}>
          Shuffle
        </Typography>
      </Stack>
    </Tooltip>
  );
};

export default ShuffleBtn;
