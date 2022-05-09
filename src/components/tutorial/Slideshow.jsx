import { Box, IconButton, Slide, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import slides from "./slides";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DoneIcon from "@mui/icons-material/Done";
import { grey } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import { uiChanged } from "../../store/ui";
import Button from "./Button";

const Slideshow = () => {
  const { tutorial } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    dispatch(uiChanged({ prop: "tutorial", att: "done", val: true }));
  };

  return (
    <Slide
      in={tutorial.open && !tutorial.done}
      timeout={750}
      direction="right"
      sx={{
        position: "absolute",
        left: -20,
        top: -20,
        bgcolor: "white",
        p: 2,
        mt: 6,
        width: { sm: 450, xs: "100%" },
        height: { sm: 250, xs: 300 },
        justifyContent: "space-around",
        boxShadow: `2px 2px 5px 0px ${grey[300]}`,
        transition: "all 0.5s",
      }}>
      <Stack>
        <div style={{ fontSize: 22, fontWeight: 300, color: "#40367D" }}>
          {slides[step].icon}
          {slides[step].label}
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
          children={slides[step].description}
        />

        <img
          src={slides[step].img}
          alt={slides[step].label}
          style={{
            alignSelf: "center",
            maxHeight: 130,
            maxWidth: "100%",
          }}
        />

        <Box mt={1}>
          {step < 6 ? (
            <div>
              <Button label="Next" handleClick={handleNext} icon={<NavigateNextIcon />} />
              {step > 0 && (
                <Button
                  label="Back"
                  handleClick={handleBack}
                  icon={<NavigateNextIcon sx={{ transform: "rotate(180deg)" }} />}
                />
              )}
            </div>
          ) : (
            <Button label="Done" handleClick={handleDone} icon={<DoneIcon />} />
          )}
        </Box>
      </Stack>
    </Slide>
  );
};

export default Slideshow;
