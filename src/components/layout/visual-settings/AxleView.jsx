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
} from "@mui/material";
import { axleChanged } from "../../../store/axle";
import { snapshotTook } from "../../../store/runtime";

let timeout;
const AxleView = () => {
  const dispatch = useDispatch();
  const { numOfBars, align } = useSelector(({ axle }) => axle);
  const { isRunning, snapshot } = useSelector(({ runtime }) => runtime);
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

  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Typography variant="button" color="secondary.lighter">
        Number Of Bars
      </Typography>
      <Slider
        value={val}
        max={1000}
        min={20}
        step={1}
        onChange={({ target }) => handleChange(target)}
        sx={{ color: "secondary.lighter", width: "100%", pt: 5 }}
        valueLabelDisplay="auto"
        disabled={isRunning}
      />

      <Typography variant="button" color="secondary.lighter">
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
    </Stack>
  );
};

export default AxleView;
