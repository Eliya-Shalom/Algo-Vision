import React, { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { resetTimer } from "../layout/topbar/Timer";
import { uiChanged } from "../../store/ui";
import { runtimeChanged, snapshotTook, visualizingPlayed } from "../../store/runtime";
import visualizePath from "../../algorithms/path-finding/visualizePath";
import {
  isPath,
  isWall,
  setWall,
  isMidway,
  cleanAndResetGrid,
} from "../../utils/boardUtils";
import "./Node.css";

let targetNum = 0;
let onChase = false;

const Node = ({ row, col, id }) => {
  const dispatch = useDispatch();
  const { grid, dimensions, view } = useSelector(({ board }) => board);
  const { mousePressedWall, dragged } = useSelector(({ ui }) => ui);
  const {
    isMaze,
    isDone,
    snapshot,
    isPainted,
    isRunning,
    runningFunc,
    instantMode,
    dynamicMode,
    midwayActive,
    mouseChaseActive,
  } = useSelector(({ runtime }) => runtime);

  useEffect(() => (targetNum = window.targets.length), [isDone, isPainted]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", `${row}-${col}`);
    resetTimer();
    dispatch(
      snapshotTook({
        category: "path",
        val: { visited: [], path: [], indices: [0, 0] },
      })
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isWall(id) || isMidway(id)) return;

    const [prevRow, prevCol] = e.dataTransfer.getData("text").split("-");

    if (+prevRow === window.startNode.row && +prevCol === window.startNode.col) {
      window.startNode = grid[row][col];
      dispatch(uiChanged({ att: "dragged", val: !dragged }));
    } else if (+prevRow === window.finishNode.row && +prevCol === window.finishNode.col) {
      window.finishNode = grid[row][col];
      dispatch(uiChanged({ att: "dragged", val: !dragged }));
    }

    if (dynamicMode) return;

    isPainted && cleanAndResetGrid(dispatch, grid, false, false, false);

    if (!runningFunc.algo || window.hasPaused || window.hasAborted) return;
    batch(() => {
      dispatch(visualizingPlayed());
      instantMode && dispatch(runtimeChanged({ att: "isRunning", val: false }));
    });

    const { algo, type } = runningFunc;

    visualizePath(algo, type, grid, snapshot.path, isMaze, dispatch, instantMode);
  };

  function handleClick() {
    if (!midwayActive || isUnclickable() || isWall(id)) return;
    !isPainted && dispatch(runtimeChanged({ att: "isPainted", val: true }));

    const nodeEle = document.getElementById(id);
    nodeEle.appendChild(document.createTextNode(`${++targetNum}`));
    if (!mouseChaseActive) nodeEle.className = "midway";
    nodeEle.style.outline = 0;
    window.targets.push({ ...grid[row][col] });
  }

  function handleChaseMouseEnter() {
    if (isUnclickable() || isWall(id) || isPath({ id }) || isDone) return;
    document.getElementById(window.finishNode.id).className = "node";
    window.finishNode = grid[row][col];
    document.getElementById(window.finishNode.id).className = "finish";

    if (!window.targets.length || !midwayActive) return;
    const { id: tId } = window.targets[window.targets.length - 1];
    document.getElementById(tId).className = "midway";
  }

  const handleWallMouseEnter = () => {
    if (isUnclickable() || !mousePressedWall || (isRunning && !dynamicMode)) return;
    setWall(id);
  };

  const handleMouseDown = () => {
    setDraggable((isStart || isFinish) && !mouseChaseActive);
    if (isUnclickable() || midwayActive || (isRunning && !dynamicMode)) return;
    dispatch(uiChanged({ att: "mousePressedWall", val: true }));
    if (mouseChaseActive) {
      dispatch(runtimeChanged({ att: "mouseChaseActive", val: false }));
      onChase = true;
    }
    setWall(id);
  };

  const handleMouseUp = () => {
    setDraggable(isStart || isFinish);
    if (mouseChaseActive || midwayActive || (isRunning && !dynamicMode)) return;
    !isPainted && dispatch(runtimeChanged({ att: "isPainted", val: true }));
    dispatch(uiChanged({ att: "mousePressedWall", val: false }));
    onChase && dispatch(runtimeChanged({ att: "mouseChaseActive", val: true }));
    onChase = false;
  };

  const boundaryWalls =
    row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1;
  const isStart = row === window.startNode.row && col === window.startNode.col;
  const isFinish = row === window.finishNode.row && col === window.finishNode.col;
  const [draggable, setDraggable] = useState(isStart || isFinish);
  const className = isStart
    ? "start"
    : isFinish
    ? "finish"
    : boundaryWalls
    ? "wall"
    : "node";

  function isUnclickable() {
    return boundaryWalls || isStart || isFinish || isMaze || isMidway(id);
  }

  return (
    <td
      id={id}
      className={className}
      draggable={draggable}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onMouseEnter={mouseChaseActive ? handleChaseMouseEnter : handleWallMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        width: dimensions.nodeSize,
        height: dimensions.nodeSize,
        outline: view.isBorders && !isStart && !isFinish ? "0.5px solid #e0e0e0" : "0px",
        userSelect: "none",
        cursor:
          !isUnclickable() && (!mouseChaseActive || isDone)
            ? "pointer"
            : isStart || isFinish
            ? "grab"
            : mouseChaseActive && isDone
            ? "none"
            : "",
      }}
    />
  );
};

export default Node;
