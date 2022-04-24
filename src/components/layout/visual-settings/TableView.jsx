import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, Stack, Typography } from "@mui/material";
import TableSlider from "./TableSlider";
import { viewChanged } from "../../../store/board";

const TableView = () => {
  const dispatch = useDispatch();
  const { dimensions, view } = useSelector(({ board }) => board);
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);
  const { height, width, maxHeight, maxWidth } = dimensions;

  function handleCheck() {
    dispatch(viewChanged({ att: "isBorders", val: !view.isBorders }));
  }

  return (
    <Stack
      sx={{
        width: { md: "70%", sm: "100%", xs: "100%" },
        display: "flex",
        textAlign: "center",
        py: 2,
      }}>
      <Box>
        <TableSlider label="Height" defaultValue={height} min={100} max={maxHeight} />
        <TableSlider label="Width" defaultValue={width} min={100} max={maxWidth} />
        <TableSlider label="Cell Size" defaultValue={35} min={20} max={50} />

        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}>
          <Box
            sx={{
              display: "flex",
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography
              variant="button"
              sx={{ fontSize: 13, color: "secondary.lighter" }}>
              Borders
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "70%",
              justifyContent: "center",
            }}>
            <Checkbox
              disabled={!category}
              onClick={handleCheck}
              checked={view.isBorders}
              color="secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "secondary.lighter",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default TableView;
