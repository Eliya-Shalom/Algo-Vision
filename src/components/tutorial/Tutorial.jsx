import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Slideshow from "./Slideshow";
import Button from "./Button";
import { uiChanged } from "../../store/ui";

const Tutorial = () => {
  const dispatch = useDispatch();
  const { tutorial } = useSelector(({ ui }) => ui);

  function handleClick() {
    dispatch(uiChanged({ prop: "tutorial", att: "open", val: true }));
  }

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: -35,
          left: 12,
          width: '100%',
          transition: "all 0.5s",
          zIndex: 100,
        }}>
        {!tutorial.done && (
          <Button
            label="Quick Tutorial"
            handleClick={handleClick}
            icon={<MenuBookIcon />}
            style={{
              height: "75px",
              alignItems: "flex-end",
              pb: 1.4,
              whiteSpace: "nowrap",
            }}
          />
        )}
        <Slideshow />
      </Box>
    </Box>
  );
};

export default Tutorial;
