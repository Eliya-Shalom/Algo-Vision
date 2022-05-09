import React from "react";
import { useSelector } from "react-redux";
import { Box, Checkbox, Typography } from "@mui/material";

const TitleCheckbox = ({ label, disabled, handleCheck, checked }) => {
  const { isMobile } = useSelector(({ ui }) => ui);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      flexDirection={isMobile && "column"}>
      <Typography
        variant="button"
        sx={{
          fontSize: 13,
          width: "30%",
          color: "secondary.lighter",
          textAlign: "center",
        }}>
        {label}
      </Typography>

      <Checkbox
        disabled={disabled}
        onClick={handleCheck}
        checked={checked}
        color="secondary"
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "start",
          color: "secondary.lighter",
        }}
      />
    </Box>
  );
};

export default TitleCheckbox;
