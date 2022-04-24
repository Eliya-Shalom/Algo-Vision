import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Home from "./Home";
import Board from "./Board";
import Axle from "./Axle";
import Legend from "../layout/Legend";
import { viewChanged } from "../../store/board";

let prevCategory;
const Main = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(({ runtime }) => runtime.runningFunc);
  const { scale, rotateX } = useSelector(({ board }) => board.view);

  useEffect(() => {
    if (category === "sort" && prevCategory !== "sort") {
      batch(() => {
        rotateX !== 0 && dispatch(viewChanged({ att: "rotateX", val: 0 }));
        scale !== 1 && dispatch(viewChanged({ att: "scale", val: 1 }));
      });
    } else {
      batch(() => {
        rotateX !== 30 && dispatch(viewChanged({ att: "rotateX", val: 30 }));
        scale !== 0.9 && dispatch(viewChanged({ att: "scale", val: 0.9 }));
      });
    }
    prevCategory = category;
  }, [category]);

  return (
    <Box
      sx={{
        display: "flex",
        alignSelf: "flex-end",
        justifyContent: "center",
        justifyItems: "center",
        justifySelf: "center",
        width: ({ custom }) => `calc(100% - ${custom.leftMenuWidth}px)`,
        height: ({ custom }) => `calc(100% - ${custom.topBarHeight}px)`,
      }}>
      {category === "sort" ? <Axle /> : category === "path" ? <Board /> : <Home />}
      {category === "path" && <Legend />}
    </Box>
  );
};

export default Main;
