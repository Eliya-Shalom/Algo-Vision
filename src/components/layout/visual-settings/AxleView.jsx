import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Radio,
  Stack,
  Slider,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Box,
  Checkbox,
} from "@mui/material";
import { axleChanged } from "../../../store/axle";
import { snapshotTook } from "../../../store/runtime";

let timeout;
const AxleView = () => {
  const dispatch = useDispatch();
  const { isRunning, snapshot } = useSelector(({ runtime }) => runtime);
  const { numOfBars, align, transition } = useSelector(({ axle }) => axle);

  const [val, setVal] = useState(numOfBars);

  function handleChange({ value }) {
    setVal(+value);
    const { swaps } = snapshot.sort;
    if (swaps) dispatch(snapshotTook({ category: "sort", val: { swaps: [], idx: 0 } }));

    if (+value < 500) dispatch(axleChanged({ att: "numOfBars", val: +value }));
    else {
      clearTimeout(timeout);
      timeout = setTimeout(
        () => dispatch(axleChanged({ att: "numOfBars", val: +value })),
        100
      );
    }
  }

  function handleClick({ target }) {
    dispatch(axleChanged({ att: "align", val: target.value }));
  }

  function handleCheck() {
    dispatch(axleChanged({ att: "transition", val: !transition }));
  }

  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" width="100%" alignItems="center">
        <Typography variant="button" color="secondary.lighter" mr={3}>
          Density
        </Typography>
        <Slider
          value={val}
          max={1000}
          min={20}
          step={1}
          onChange={({ target }) => handleChange(target)}
          sx={{ color: "secondary.lighter", width: "100%", pt: 5 }}
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => val + " Bars"}
          disabled={isRunning}
        />
      </Box>

      <Box display="flex" width="100%" alignItems="center">
        <Typography variant="button" color="secondary.lighter" mr={3}>
          Align
        </Typography>
        <FormControl sx={{ width: "100%", alignItems: "center" }}>
          <RadioGroup row value={align} onChange={handleClick}>
            {["start", "center", "end"].map((val) => (
              <FormControlLabel
                key={val}
                label={val}
                value={val === "center" ? "center" : `flex-${val}`}
                defaultChecked={val === "start"}
                disabled={isRunning}
                disableTypography={true}
                sx={{
                  fontSize: 12,
                  color: "secondary.lighter",
                  textTransform: "uppercase",
                  m: 0,
                }}
                control={<Radio color="secondary" />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box display="flex" width="100%">
        <Box
          sx={{
            display: "flex",
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography
            variant="button"
            sx={{ fontSize: 14, color: "secondary.lighter", mr: 3 }}>
            Transitions
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "70%",
            justifyContent: "center",
          }}>
          <Checkbox
            onClick={handleCheck}
            checked={transition}
            color="secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "secondary.lighter",
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default AxleView;
