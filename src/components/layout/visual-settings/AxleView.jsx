import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Radio,
  Stack,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Box,
} from "@mui/material";
import { axleChanged } from "../../../store/axle";
import { snapshotTook } from "../../../store/runtime";
import TitleCheckbox from "../../common/TitleCheckbox";
import TitleSlider from "../../common/TitleSlider";

let timeout;
const AxleView = () => {
  const dispatch = useDispatch();
  const { isRunning, snapshot } = useSelector(({ runtime }) => runtime);
  const { numOfBars, align, transition } = useSelector(({ axle }) => axle);

  const [val, setVal] = useState(numOfBars);

  function handleChange({ target: { value } }) {
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
    <Stack display="flex" justifyContent="center" alignItems="center" width="70%">
      <Box display="flex" width="100%">
        <TitleSlider
          label="Density"
          defaultValue={val}
          min={20}
          max={1500}
          step={1}
          disabled={isRunning}
          handleChange={handleChange}
          unit=" Bars"
        />
      </Box>

      <Box display="flex" width="100%" alignItems="center">
        <Typography
          width="30%"
          variant="button"
          color="secondary.lighter"
          textAlign="center">
          Align
        </Typography>
        <FormControl sx={{ width: "70%", alignItems: "start", justifyContent: "center" }}>
          <RadioGroup row value={align} onChange={handleClick}>
            {["start", "center", "end"].map((val) => (
              <FormControlLabel
                key={val}
                label={val}
                value={val === "center" ? "center" : `flex-${val}`}
                defaultChecked={val === "start"}
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
      <TitleCheckbox label="Transition" handleCheck={handleCheck} checked={transition} />
    </Stack>
  );
};

export default AxleView;
