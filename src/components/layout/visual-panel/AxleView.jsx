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
  const { isMobile } = useSelector(({ ui }) => ui);

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
    <Stack width="100%">
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

      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
        mt={1}
        flexDirection={isMobile && "column"}>
        <Typography
          variant="button"
          sx={{
            width: "30%",
            fontSize: 13,
            textAlign: "center",
            color: "secondary.lighter",
          }}>
          Align
        </Typography>
        <FormControl>
          <RadioGroup row value={align} onChange={handleClick}>
            {["start", "center", "end"].map((val) => (
              <FormControlLabel
                key={val}
                label={val}
                labelPlacement={isMobile ? "top" : "start"}
                value={val === "center" ? "center" : `flex-${val}`}
                defaultChecked={val === "start"}
                disableTypography={true}
                sx={{
                  fontSize: 10,
                  color: "secondary.lighter",
                  textTransform: "uppercase",
                  px: 0.5,
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
