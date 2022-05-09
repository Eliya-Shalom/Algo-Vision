import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Home from "./home/Home";
import Board from "./Board/Board";
import Axle from "./Axle/Axle";
import Tutorial from "../tutorial/Tutorial";
import Legend from "../layout/Legend";
import { uiChanged } from "../../store/ui";

let prevCategory;
const Main = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);
  const { sideMenu, topBar, visualPanel, threeD } = useSelector(({ ui }) => ui);
  const { scale, rotateX } = threeD;

  useEffect(() => {
    if (category === "sort" && prevCategory !== "sort") {
      batch(() => {
        rotateX !== 0 && dispatch(uiChanged({ prop: "threeD", att: "rotateX", val: 0 }));
        scale !== 1 && dispatch(uiChanged({ prop: "threeD", att: "scale", val: 1 }));
      });
    } else {
      batch(() => {
        rotateX !== 30 &&
          dispatch(uiChanged({ prop: "threeD", att: "rotateX", val: 30 }));
        scale !== 0.9 && dispatch(uiChanged({ prop: "threeD", att: "scale", val: 0.9 }));
      });
    }
    prevCategory = category;
  }, [category]);

  return (
    <Box
      sx={{
        bgcolor: "#F3F5FA",
        display: "flex",
        alignSelf: "flex-end",
        justifyContent: "center",
        width: `calc(100% - ${sideMenu.width}px)`,
        height: `calc(100% - ${topBar.height + visualPanel.panelHeight - 5}px)`,
        transition: "all 0.5s",
        position: "relative",
        mb: `${visualPanel.panelHeight - 5}px`,
      }}>
      {category === "sort" ? <Axle /> : category === "path" ? <Board /> : <Home />}
      {category === "path" && <Legend />}
      <Tutorial />
    </Box>
  );
};

export default Main;
