import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { resetTimer, startTimer } from "../indicators/Timer";
import { runtimeChanged, visualizingPlayed } from "../../../../store/runtime";
import { cleanPrevAlgo, copyGrid } from "../../../../utils/boardUtils";
import visualizeSort from "../../../../algorithms/sorting/visualizeSort";
import visualizePath from "../../../../algorithms/path-finding/visualizePath";
import dynamicAStar from "../../../../algorithms/path-finding/dynamicAStar";
import ActionBtn from "../../../common/ActionBtn";
import useGetCategoryAndAlgo from "../../../../hooks/useGetCategoryAndAlgo";

const PlayBtn = () => {
  const dispatch = useDispatch();
  const { isBorders } = useSelector(({ ui }) => ui.board);
  const { colorMode } = useSelector(({ ui }) => ui);
  const { grid } = useSelector(({ board }) => board);
  const { axle } = useSelector(({ axle }) => axle);
  const {
    isDone,
    isMaze,
    snapshot,
    isPainted,
    isRunning,
    instantMode,
    isMazeRunning,
    dynamicSnapshot,
    isShuffling,
  } = useSelector(({ runtime }) => runtime);
  const [category, algo] = useGetCategoryAndAlgo();

  const dynamicMode = algo === "Dynamic-Path-finding";

  const handleClick = () => {
    if (isMazeRunning) return;

    isDone && resetTimer();
    if (isPainted && category === "Path-finding" && !dynamicMode && !window.hasPaused)
      cleanPrevAlgo(grid, dispatch);

    if (!instantMode) {
      startTimer();
      dispatch(visualizingPlayed());
    } else dispatch(runtimeChanged({ att: "isPainted", val: true }));

    window.hasPaused = false;
    window.hasAborted = false;

    if (dynamicMode)
      return dynamicAStar(copyGrid(grid), dynamicSnapshot, isBorders, dispatch);

    if (category === "Path-finding")
      visualizePath(algo, grid, isMaze, dispatch, instantMode, colorMode);
    else visualizeSort(axle, algo, snapshot.sort, dispatch);
  };

  const disabled = ((isRunning || !algo || isMazeRunning) && !dynamicMode) || isShuffling;

  const iconStyle = {
    fontSize: 30,
    color: disabled ? "grey.500" : "success.light",
  };

  return (
    <ActionBtn
      children={<PlayCircleOutlineIcon sx={iconStyle} />}
      disabled={disabled}
      handleClick={handleClick}
      label="PLAY"
    />
  );
};

export default PlayBtn;
