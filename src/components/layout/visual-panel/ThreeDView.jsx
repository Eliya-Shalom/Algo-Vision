import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import TitleSlider from "../../common/TitleSlider";
import { uiChanged } from "../../../store/ui";

let timeout;
const ThreeDView = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);
  const { rotateX, rotateY, rotateZ, perspective, scale } = useSelector(
    ({ ui }) => ui.threeD
  );

  const handleChange = (e, label) => {
    const { value } = e.target;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let att;
      if (label === "Perspective" || label === "Scale") att = label.toLowerCase();
      else att = `rotate${label[label.length - 1]}`;
      dispatch(uiChanged({ prop: "threeD", att, val: +value }));
    }, 10);
  };

  const sliders = [
    { label: "Rotate-X", defVal: rotateX, min: -180, max: 180, step: 0.01, unit: "°" },
    { label: "Rotate-Y", defVal: rotateY, min: -180, max: 180, step: 0.01, unit: "°" },
    { label: "Rotate-Z", defVal: rotateZ, min: -180, max: 180, step: 0.01, unit: "°" },
    { label: "Scale", defVal: scale, min: 0.3, max: 1.5, step: 0.001, unit: "" },
    {
      label: "Perspective",
      defVal: perspective,
      min: 0,
      max: 2500,
      step: 1,
      unit: "px",
    },
  ];

  return (
    <Stack width="100%">
      {sliders.map(({ label, defVal, min, max, step, unit }) => (
        <TitleSlider
          key={label}
          label={label}
          defaultValue={defVal}
          step={step}
          min={min}
          max={max}
          unit={unit}
          handleChange={handleChange}
          disabled={!category}
        />
      ))}
    </Stack>
  );
};

export default ThreeDView;
