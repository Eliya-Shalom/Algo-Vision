import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  Collapse,
  Typography,
  ButtonBase,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import BoardView from "./BoardView";
import TableView from "./TableView";
import AxleView from "./AxleView";
import { axleChanged } from "../../../store/axle";
import { boardSettingReset, visualSettingsReset } from "../../../store/board";

const Panel = () => {
  const dispatch = useDispatch();
  const { runningFunc, isRunning } = useSelector(({ runtime }) => runtime);
  const { category } = runningFunc;
  const [open, setOpen] = useState(false);
  const [rotateDeg, setRotateDeg] = useState(360);

  const resetAll = () => {
    setRotateDeg(rotateDeg + 360);
    batch(() => {
      dispatch(visualSettingsReset(category));
      if (category === "path") {
        dispatch(boardSettingReset());
      } else {
        // dispatch(axleChanged({ att: "numOfBars", val: 100 }));
        // dispatch(axleChanged({ att: "align", val: "flex-end" }));
      }
    });
  };

  const disabled = isRunning && category === 'path';
  const styles = {
    drawer: {
      transition: "0.3s",
      "& .MuiDrawer-paper": {
        border: 0,
        bgcolor: "#40367d",
        outline: "3px solid #40367d",
        width: ({ custom }) => `${custom.leftMenuWidth})px`,
        minHeight: ({ custom }) => custom.visualPanelHeight,
        ml: ({ custom }) => `${custom.leftMenuWidth}px`,
      },
    },
    arrowIcon: {
      color: "secondary.lighter",
      fontSize: 30,
      transform: open ? "rotate(180deg)" : "rotate(0)",
      transition: "0.3s",
    },
    settingsIcon: {
      color: "secondary.lighter",
      fontSize: 30,
      mr: 1,
    },
    resetBtn: {
      transition: "all 0.25s",
      bgcolor: disabled ? "#BDBDBD" : "secondary.main",
      color: "secondary.dark",
      "&:hover": {
        bgcolor: "secondary.light",
        color: "grey.400",
      },
    },
  };

  return (
    <Drawer anchor="bottom" variant="permanent" sx={styles.drawer}>
      <ButtonBase sx={{ py: 1 }} onClick={() => setOpen(!open)}>
        <DisplaySettingsIcon sx={styles.settingsIcon} />
        <Typography
          variant="button"
          sx={{ fontWeight: "fontWeightLight", color: "grey.300", pr: 3 }}>
          Visual Settings
        </Typography>
        <KeyboardArrowUp sx={styles.arrowIcon} />
      </ButtonBase>

      <Collapse in={open}>
        <Box display="flex" bgcolor="secondary.dark">
          <Box width="50%" display="flex" justifyContent="center">
            <BoardView />
          </Box>

          <Divider variant="middle" orientation="vertical" flexItem>
            <Stack>
              <Typography
                variant="button"
                sx={{ fontWeight: "fontWeightLight", color: "grey.300", fontSize: 11 }}>
                RESET
              </Typography>
              <Button onClick={resetAll} sx={styles.resetBtn} disabled={disabled}>
                <ReplayIcon
                  sx={{
                    transform: `rotate(-${rotateDeg}deg)`,
                    transition: "transform 1s",
                  }}
                />
              </Button>
            </Stack>
          </Divider>
          <Box width="50%" display="flex" justifyContent="center">
            {category !== "sort" && <TableView />}
            {category === "sort" && <AxleView />}
          </Box>
        </Box>
      </Collapse>
    </Drawer>
  );
};

export default Panel;
