import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";
import { dimensionsChanged, viewChanged } from "../../../store/board";
import TitleSlider from "../../common/TitleSlider";
import TitleCheckbox from "../../common/TitleCheckbox";

let timeout;
const TableView = () => {
  const dispatch = useDispatch();
  const { dimensions, view } = useSelector(({ board }) => board);
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);
  const { height, width, maxHeight, maxWidth } = dimensions;

  function handleCheck() {
    dispatch(viewChanged({ att: "isBorders", val: !view.isBorders }));
  }
  const { isRunning, runningFunc } = useSelector(({ runtime }) => runtime);

  const handleChange = (e, label) => {
    const { value } = e.target;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let att;
      if (label === "Cell Size") att = "nodeSize";
      else att = label.toLowerCase();
      dispatch(dimensionsChanged({ att, val: +value }));
    }, 100);
  };

  const disabled = isRunning || !runningFunc.category;
  const sliders = [
    { label: "Height", defVal: height, min: 100, max: maxHeight },
    { label: "Width", defVal: width, min: 100, max: maxWidth },
    { label: "Cell Size", defVal: 35, min: 20, max: 50 },
  ];
  return (
    <Stack
      sx={{
        width: { md: "70%", sm: "100%", xs: "100%" },
        display: "flex",
        textAlign: "center",
        py: 2,
      }}>
      <Box>
        {sliders.map(({ label, defVal, min, max }) => (
          <TitleSlider
            key={label}
            label={label}
            defaultValue={defVal}
            min={min}
            max={max}
            step={1}
            disabled={disabled}
            handleChange={handleChange}
            unit="px"
          />
        ))}
        <TitleCheckbox
          label="Borders"
          disabled={!category}
          handleCheck={handleCheck}
          checked={view.isBorders}
        />
      </Box>
    </Stack>
  );
};

export default TableView;
