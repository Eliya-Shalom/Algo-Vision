import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Button, Divider, Stack, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { boardDimensionsReset } from "../../../store/board";
import { visualSettingsReset } from "../../../store/ui";

const ResetButton = () => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector(({ ui }) => ui);
  const { runningFunc, isRunning } = useSelector(({ runtime }) => runtime);
  const [rotateDeg, setRotateDeg] = useState(360);

  const resetAll = () => {
    setRotateDeg(rotateDeg + 360);
    batch(() => {
      dispatch(visualSettingsReset(runningFunc.category));
      if (runningFunc.category === "path") {
        dispatch(boardDimensionsReset());
      }
    });
  };

  const disabled = isRunning && runningFunc.category === "path";

  return (
    <Divider
      flexItem
      variant="middle"
      orientation={isMobile ? "horizontal" : "vertical"}
      sx={{ mt: isMobile && -9, pb: isMobile && 5 }}>
      <Stack>
        <Typography variant="button" fontSize={11} color="grey.300" children="RESET" />
        <Button
          onClick={resetAll}
          sx={{
            transition: "all 0.25s",
            bgcolor: disabled ? "#BDBDBD" : "secondary.main",
            color: "secondary.dark",
            "&:hover": {
              bgcolor: "secondary.light",
              color: "grey.400",
            },
          }}
          disabled={disabled}>
          <ReplayIcon
            sx={{ transform: `rotate(-${rotateDeg}deg)`, transition: "transform 1s" }}
          />
        </Button>
      </Stack>
    </Divider>
  );
};

export default ResetButton;
