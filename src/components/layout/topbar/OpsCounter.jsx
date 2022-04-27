import React from "react";
import { Box } from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { useSelector } from "react-redux";
import TitleIcon from "../../common/TitleIcon";

const OpsCounter = () => {
  const { opsCounter } = useSelector(({ ui }) => ui);
  const iconStyle = { color: "secondary.main", fontSize: 30 };
  return (
    <TitleIcon
      Icon={<AssessmentOutlinedIcon sx={iconStyle} />}
      label={opsCounter}
      tooltip={
        <Box width='190px'>
          <Box textAlign="center">Operations-Counter</Box>
          <Box extAlign="start">
            Loops iterations, arrays accesses, comparisons, recursive calls, etc.
          </Box>
        </Box>
      }
    />
  );
};

export default OpsCounter;
