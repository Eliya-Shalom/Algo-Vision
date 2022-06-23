import React, { useState } from "react";
import { Typography, Box, IconButton, Stack, Collapse, Tooltip } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import useGetCategoryAndAlgo from "../../hooks/useGetCategoryAndAlgo";

const Legend = () => {
  const [_, algo] = useGetCategoryAndAlgo();
  const [open, setOpen] = useState(false);
  const dynamicMode = algo === "Dynamic-Path-finding";
  const legend = [
    { label: "Start Node", color: "success.light" },
    { label: "Finish Node", color: "error.light" },
    dynamicMode && { label: "Midway", color: "#e87f29" },
    { label: "Visited Node", color: "#c6ceff" },
    !dynamicMode && { label: "Path Node", color: "secondary.main" },
    { label: "Wall", color: "#8679CB" },
  ];

  const toRender = legend.filter((item) => item);

  const styles = {
    container: {
      position: "absolute",
      right: 10,
      top: 10,
      display: "flex",
      alignItems: "flex-end",
    },
    icon: {
      height: { md: 50, sm: 40, xs: 40 },
      width: { md: 50, sm: 40, xs: 40 },
      border: "4px solid",
      borderColor: "secondary.main",
      color: "secondary.main",
      bgcolor: "#FFFFFF",
      borderRadius: 50,
      mb: 1,
      zIndex: 102,
    },
    textBox: {
      display: "flex",
      alignItems: "center",
      bgcolor: "#F3F5FA",
      height: { md: 35, sm: 20, xs: 15 },
      px: 1,
    },
    square(label, color) {
      return {
        bgcolor: color,
        width: { md: 35, sm: 20, xs: 15 },
        height: { md: 35, sm: 20, xs: 15 },
        borderRadius: "2px",
        "&:hover": { bgcolor: color },
        boxShadow: `2px 5px 0px 0px black ${label === "Wall" ? "inset" : ""}`,
      };
    },
  };

  return (
    <Stack sx={styles.container}>
      <Tooltip title="Legend">
        <IconButton onClick={() => setOpen(!open)} sx={styles.icon}>
          <TextSnippetIcon sx={{ fontSize: { md: 30, sm: 22, xs: 22 } }} />
        </IconButton>
      </Tooltip>
      <Collapse in={open}>
        {toRender.map(({ label, color }) => (
          <Box key={label} display="flex" justifyContent="flex-end" pr={1} mb={2}>
            <Box sx={styles.textBox}>
              <Typography variant="body2" color="primary" children={label} noWrap />
            </Box>
            <Box key={color} sx={styles.square(label, color)} />
          </Box>
        ))}
      </Collapse>
    </Stack>
  );
};

export default Legend;
