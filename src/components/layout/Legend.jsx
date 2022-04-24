import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, IconButton, Stack, Collapse } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const Legend = () => {
  const { dynamicMode } = useSelector(({ runtime }) => runtime);
  const [open, setOpen] = useState(false);

  const legend = [
    { label: "Start Node", color: "success.light" },
    { label: "Finish Node", color: "error.light" },
    dynamicMode && { label: "Midway", color: "#e87f29" },
    { label: "Visited Node", color: "#c6ceff" },
    !dynamicMode && { label: "Path Node", color: "secondary.main" },
    { label: "Wall", color: "#9995BC" },
  ];

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Stack position="absolute" right={20}>
      <Stack ml={20} mt={2} alignItems="center">
        <Typography children="LEGEND" fontSize={14} mb={1} color="secondary.main" />
        <IconButton
          onClick={handleClick}
          sx={{
            width: 50,
            height: 50,
            border: "4px solid",
            borderColor: "secondary.main",
            color: "secondary.main",
            bgcolor: "#FFFFFF",
            "&:hover": { bgcolor: "#FFFFFF" },
            borderRadius: 50,
            mb: 2,
          }}>
          <TextSnippetIcon />
        </IconButton>
      </Stack>
      <Collapse in={open}>
        {legend.map((item) => {
          if (!item) return null;
          const { label, color } = item;
          return (
            <Box key={label} display="flex" justifyContent="flex-end" pr={1.5}>
              <Box
                alignItems="center"
                display="flex"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F3F5FA",
                  height: 25,
                  px: 1,
                  mt: 1,
                }}>
                <Typography variant="body2" color="primary" children={label} noWrap />
              </Box>
              <Box
                key={label}
                sx={{
                  bgcolor: color,
                  width: 35,
                  height: 35,
                  borderRadius: 0,
                  mb: 3,
                  "&:hover": { bgcolor: color },
                  boxShadow: `2px 5px 0px 0px black ${label === "Wall" ? "inset" : ""}`,
                }}
              />
            </Box>
          );
        })}
      </Collapse>
    </Stack>
  );
};

export default Legend;
