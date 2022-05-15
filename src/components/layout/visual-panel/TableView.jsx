import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";
import { dimensionsChanged } from "../../../store/board";
import TitleSlider from "../../common/TitleSlider";
import TitleCheckbox from "../../common/TitleCheckbox";
import { uiChanged } from "../../../store/ui";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";

let timeout;
const TableView = () => {
  const dispatch = useDispatch();
  const { dimensions } = useSelector(({ board }) => board);
  const { isBorders } = useSelector(({ ui }) => ui.board);
  const { isRunning } = useSelector(({ runtime }) => runtime);
  const [category] = useGetCategoryAndAlgo();

  const { height, width, maxHeight, maxWidth } = dimensions;

  function handleCheck() {
    dispatch(uiChanged({ prop: "board", att: "isBorders", val: !isBorders }));
  }

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

  const disabled = isRunning || !category;
  const sliders = [
    { label: "Height", defVal: height, min: 100, max: maxHeight },
    { label: "Width", defVal: width, min: 100, max: maxWidth },
    { label: "Cell Size", defVal: 35, min: 15, max: 50 },
  ];
  return (
    <Stack width="100%">
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
          checked={isBorders}
        />
      </Box>
    </Stack>
  );
};

export default TableView;
