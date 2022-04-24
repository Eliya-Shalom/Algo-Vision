import React from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import BoardSlider from "./BoardSlider";

const BoardView = () => {
  const { rotateX, rotateY, rotateZ, perspective, scale } = useSelector(
    ({ board }) => board.view
  );

  return (
    <Stack
      sx={{
        width: { md: "70%", sm: "100%", xs: "100%" },
        textAlign: "center",
        py: 2,
      }}>
      <BoardSlider
        label="Rotate-X"
        defaultValue={rotateX}
        step={0.01}
        min={-180}
        max={180}
        unit="°"
      />
      <BoardSlider
        label="Rotate-Y"
        defaultValue={rotateY}
        step={0.01}
        min={-180}
        max={180}
        unit="°"
      />
      <BoardSlider
        label="Rotate-Z"
        defaultValue={rotateZ}
        step={0.01}
        min={-180}
        max={180}
        unit="°"
      />
      <BoardSlider label="Scale" defaultValue={scale} step={0.001} min={0.3} max={1.5} />
      <BoardSlider
        label="Perspective"
        defaultValue={perspective}
        min={0}
        max={2500}
        unit="px"
      />
    </Stack>
  );
};

export default BoardView;
