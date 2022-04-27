import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TitleCheckbox = ({ label, disabled, handleCheck, checked }) => {
  return (
    <Box display="flex" width="100%">
      <Box display="flex" width="30%" justifyContent="center" alignItems="center">
        <Typography variant="button" sx={{ fontSize: 13, color: "secondary.lighter" }}>
          {label}
        </Typography>
      </Box>

      <Box display="flex" width="70%" justifyContent="start">
        <Checkbox
          disabled={disabled}
          onClick={handleCheck}
          checked={checked}
          color="secondary"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "secondary.lighter",
          }}
        />
      </Box>
    </Box>
  );
};

export default TitleCheckbox;
