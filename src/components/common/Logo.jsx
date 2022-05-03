import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";

const Logo = ({ handleClick }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="h5" color="white" sx={{ fontSize: 34, mr: 0.5 }}>
        <sup>
          <ins style={{ fontWeight: 200, fontSize: 22 }}>Algo</ins>
        </sup>
        <strong style={{ fontSize: 34 }}>Vision</strong>
      </Typography>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <FitbitIcon sx={{ color: "white", fontSize: 50 }} />
      </IconButton>
    </Box>
  );
};

export default Logo;
