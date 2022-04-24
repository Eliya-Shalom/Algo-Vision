import { Button, Box, Typography, Stack, IconButton, Slide } from "@mui/material";
import React, { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CancelIcon from "@mui/icons-material/Cancel";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";

import algoImg from "../../assets/tutorial/algo.png";
import actionsImg from "../../assets/tutorial/actions.png";
import controllersImg from "../../assets/tutorial/controllers.png";
import indicatorsImg from "../../assets/tutorial/indicators.png";
import sourceImg from "../../assets/tutorial/source.png";
import settingsImg from "../../assets/tutorial/settings.png";
import expImg from "../../assets/tutorial/example.png";
import { grey } from "@mui/material/colors";

const styles = {
  icon: { fontSize: 30, mr: 2 },
  btn: {
    bgcolor: "secondary.main",
    "&:hover": { bgcolor: "secondary.main", opacity: 0.9 },
  },
};

const steps = [
  {
    label: "Algorithm",
    icon: <LooksOneIcon sx={styles.icon} />,
    description: `Choose Path-Finding / Sorting algorithm.`,
    img: algoImg,
  },
  {
    label: "Action Buttons",
    icon: <LooksTwoIcon sx={styles.icon} />,
    description: `Use the Action-Buttons to perform various actions related to the
    visualization animation & environment. `,
    img: actionsImg,
  },
  {
    label: "Control Buttons",
    icon: <Looks3Icon sx={styles.icon} />,
    description: `Control the visualization progress and speed.`,
    img: controllersImg,
  },
  {
    label: "Indicators",
    icon: <Looks4Icon sx={styles.icon} />,
    description: `Get live information about the visualiztion progress.`,
    img: indicatorsImg, 
  },
  {
    label: "Sorce-Code",
    icon: <Looks5Icon sx={styles.icon} />,
    description: `Look at the algorithm code implementation in JavaScript.`,
    img: sourceImg,
  },
  {
    label: "Visual-Settings",
    icon: <Looks6Icon sx={styles.icon} />,
    description: `Adjust the environment style to your flavor.`,
    img: settingsImg,
  },
  {
    label: "Enjoy!",
    icon: <EmojiEmotionsIcon sx={styles.icon} />,
    description: `Have fun and good learning experience.`,
    img: expImg,
  },
];

const Btn = ({ children, handleClick, icon, ...additionalStyle }) => {
  return (
    <Button
      sx={{
        ...additionalStyle,
        mr: 1.5,
        mb: -1,
        bgcolor: "#40367D",
        "&:hover": { bgcolor: "#40367D", filter: "brightness(120%)" },
      }}
      size="small"
      variant="contained"
      onClick={handleClick}>
      {icon} {children}
    </Button>
  );
};

const Tutorial = () => {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    setIdx((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setIdx((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    setOpen(false);
    setRead(true);
    setIdx(0);
  };

  return (
    <Box>
      <Box position="absolute" top={45} left={270}>
        <Btn
          children={!read && <Box ml={2}>Quick Tutorial</Box>}
          handleClick={() => setOpen(true)}
          icon={<MenuBookIcon sx={{ fontSize: 22 }} />}
          alignItems="end"
          fontSize={12}
          height={75}
          pb={1.2}
        />
      </Box>
      <Slide
        in={open}
        timeout={750}
        direction="right"
        sx={{ position: "absolute", top: 30, left: 240 }}>
        <Stack
          p={2}
          mt={6}
          width="450px"
          height="280px"
          bgcolor="white"
          justifyContent="space-around"
          boxShadow={`2px 2px 5px 0px ${grey[300]}`}>
          <div style={{ fontSize: 22, fontWeight: 300, color: "#40367D" }}>
            {steps[idx].icon}
            {steps[idx].label}
            <IconButton
              onClick={handleDone}
              children={<CancelIcon fontSize="30" />}
              sx={{ fontSize: 30, color: "#40367D", float: "right" }}
            />
          </div>

          <Typography
            variant="body2"
            color="secondary.dark"
            px={2}
            children={steps[idx].description}
          />
          <img
            src={steps[idx].img}
            style={{
              alignSelf: "center",
              maxHeight: 160,
              maxWidth: "100%",
            }}
            alt={steps[idx].label}
          />
          <Box>
            {idx < 6 ? (
              <div>
                <Btn children="Next" handleClick={handleNext} />
                {idx > 0 && <Btn children="Back" handleClick={handleBack} />}
              </div>
            ) : (
              <Btn children="Done" handleClick={handleDone} />
            )}
          </Box>
        </Stack>
      </Slide>
    </Box>
  );
};

export default Tutorial;
