import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { batch, useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import Tutorial from "../tutorial/Tutorial";
import { uiChanged } from "../../store/ui";
import useGetCategoryAndAlgo from "../../hooks/useGetCategoryAndAlgo";

let prevCategory;
const Main = () => {
  const { custom } = useTheme();
  const dispatch = useDispatch();
  const { sideMenu, topBar, visualPanel, threeD } = useSelector(({ ui }) => ui);
  const { scale, rotateX } = threeD;
  const [category] = useGetCategoryAndAlgo();

  useEffect(() => {
    if (category === "Sorting" && prevCategory !== "Sorting") {
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
        bgcolor: custom.main.background,
        display: "flex",
        alignSelf: "flex-end",
        justifyContent: "center",
        width: `calc(100% - ${sideMenu.width}px)`,
        height: `calc(100% - ${topBar.height + visualPanel.panelHeight - 5}px)`,
        transition: "all 0.3s",
        position: "relative",
        mb: `${visualPanel.panelHeight - 5}px`,
      }}>
      <Outlet />
      <Tutorial />
    </Box>
  );
};

export default Main;
