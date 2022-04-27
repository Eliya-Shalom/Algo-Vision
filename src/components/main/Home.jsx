import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import BoardModel from "./Board/BoardModel";
import AxleModel from "./Axle/AxleModel";

const Home = () => {
  const [showBoard, setShowBoard] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => setShowBoard(true), 3000);
    const timeout2 = setTimeout(() => setShowHeader(true), 5000);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <Box
      pt={5}
      width="100%"
      height="100%"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
      position="relative">
      <Box
        width="130%"
        height="55%"
        sx={{
          position: "absolute",
          top: "50%",
          left: "-15%",
          transition: "1s",
        }}>
        <AxleModel />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: { sm: "2%", md: "10%", lg: "2%", xl: "15%" },
          opacity: showHeader ? 1 : 0,
          transition: "3s",
        }}>
        <Typography
          sx={{ fontSize: { sm: 20, md: 20, lg: 25 }, mb: "-3%" }}
          textAlign="center"
          color="secondary.dark"
          fontWeight={300}
          children="Path-Finding & Sorting Algorithms"
        />
        <Typography
          sx={{
            fontSize: { sm: 60, md: 70, lg: 100 },
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
      </Box>

      <Box
        width="50%"
        height="60%"
        sx={{
          opacity: showBoard ? 1 : 0,
          transition: "2s",
          transform: showBoard ? "scale(1)" : "scale(0)",
          ml: 10,
          position: "absolute",
          top: "15%",
          left: { sm: "45%", md: "50%", lg: "50%", xl: "43%" },
        }}>
        <BoardModel />
      </Box>
    </Box>
  );
};

export default Home;
