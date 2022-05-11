import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, IconButton, Stack, Collapse, Tooltip } from "@mui/material";
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
    <Stack
      sx={{
        position: "absolute",
        right: 10,
        top: 10,
        display: "flex",
        alignItems: "flex-end",
      }}>
      <Tooltip title="Legend">
        <IconButton
          onClick={handleClick}
          sx={{
            height: { md: 50, sm: 40, xs: 40 },
            width: { md: 50, sm: 40, xs: 40 },
            border: "4px solid",
            borderColor: "secondary.main",
            color: "secondary.main",
            bgcolor: "#FFFFFF",
            "&:hover": { bgcolor: "#FFFFFF" },
            borderRadius: 50,
            mb: 1,
            zIndex: 102,
          }}>
          <TextSnippetIcon sx={{ fontSize: { md: 30, sm: 22, xs: 22 } }} />
        </IconButton>
      </Tooltip>
      <Collapse in={open}>
        {legend.map((item) => {
          if (!item) return null;
          const { label, color } = item;
          return (
            <Box key={label} display="flex" justifyContent="flex-end" pr={1} mb={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F3F5FA",
                  height: { md: 35, sm: 20, xs: 15 },
                  px: 1,
                }}>
                <Typography variant="body2" color="primary" children={label} noWrap />
              </Box>

              <Box
                key={label}
                sx={{
                  bgcolor: color,
                  width: { md: 35, sm: 20, xs: 15 },
                  height: { md: 35, sm: 20, xs: 15 },
                  borderRadius: 1,
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
