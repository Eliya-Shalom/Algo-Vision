import { Stack, Typography } from "@mui/material";
import React from "react";

const Header = ({ show }) => {
  return (
    <Stack sx={{ opacity: show ? 1 : 0, transition: "3s" }}>
      <Typography
        sx={{
          fontSize: { xs: 13, sm: 15, md: 18, lg: 24, xl: 26 },
          mb: "-3%",
        }}
        textAlign="center"
        color="secondary.dark"
        fontWeight={300}
        children="Path-Finding & Sorting Algorithms"
      />
      <Typography
        sx={{
          fontSize: { xs: 45, sm: 50, md: 60, lg: 80, xl: 90 },
          WebkitTextFillColor: "transparent",
          background: "linear-gradient(10deg, #735ED9 30%, #a598e7 50%, #735ED9 80%)",
          WebkitBackgroundClip: "text",
          filter: "drop-shadow(3px 3px 0px #2E2659)",
        }}
        fontWeight={800}
        textAlign="center"
        textTransform="uppercase"
        children="Visualizer"
      />
    </Stack>
  );
};

export default Header;
