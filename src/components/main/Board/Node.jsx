import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { resetTimer } from "../../layout/topbar/indicators/Timer";
import { uiChanged } from "../../../store/ui";
import { runtimeChanged, visualizingPlayed } from "../../../store/runtime";
import visualizePath from "../../../algorithms/path-finding/visualizePath";
import { isPath, cleanPrevAlgo } from "../../../utils/boardUtils";
import { nodeChanged } from "../../../store/board";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";
import "./Node.css";

let targetNum = 0;
let onChase = false;
let prevStartOrEnd = [0, 0];
let prevNode = [0, 0];

const Node = ({
  id,
  row,
  col,
  weight,
  isWall,
  isStart,
  isFinish,
  isMidway,
  isBoundaryWall,
}) => {
  const dispatch = useDispatch();
  const { nodeSize } = useSelector(({ board }) => board.dimensions);
  const { board, isMobile } = useSelector(({ ui }) => ui);
  const { custom } = useTheme();
  const { isDragging, isBorders } = board;
  const {
    isMaze,
    isDone,
    isPainted,
    isRunning,
    instantMode,
    midwayActive,
    mouseChaseActive,
  } = useSelector(({ runtime }) => runtime);
  const [, algo] = useGetCategoryAndAlgo();

  const dynamicMode = algo === "Dynamic-Path-finding";

  useEffect(() => (targetNum = window.targetNodes.length), [isDone, isPainted]);

  const handleDragStart = () => {
    prevStartOrEnd = [row, col];
    isMobile && dispatch(uiChanged({ prop: "board", att: "isDragging", val: true }));

    resetTimer();
    window.snapshot.path = { visited: [], path: [], indices: [0, 0] };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isWall || isMidway || isStart || isFinish) return;
    const [prevRow, prevCol] = prevStartOrEnd;
    const { row: sRow, col: sCol } = window.startNode;
    let att;

    if (prevRow === sRow && prevCol === sCol) {
      window.startNode = window.grid[row][col];
      att = "isStart";
    } else {
      window.finishNode = window.grid[row][col];
      att = "isFinish";
    }

    batch(() => {
      dispatch(nodeChanged({ row, col, att, val: true }));
      dispatch(nodeChanged({ row: prevRow, col: prevCol, att, val: false }));
    });
    prevStartOrEnd = [row, col];

    if (dynamicMode) return;

    isPainted && cleanPrevAlgo(window.grid, dispatch);

    if (!algo || window.hasPaused || window.hasAborted) return;
    batch(() => {
      dispatch(visualizingPlayed());
      instantMode && dispatch(runtimeChanged({ att: "isRunning", val: false }));
    });

    visualizePath(algo, window.grid, isMaze, dispatch, instantMode);
  };

  function handleClick() {
    if (!midwayActive || isStart || isWall || (!mouseChaseActive && isFinish)) return;

    !isPainted && dispatch(runtimeChanged({ att: "isPainted", val: true }));

    const nodeEle = document.getElementById(id);
    if (nodeEle.firstChild) nodeEle.removeChild(nodeEle.firstChild);
    nodeEle.appendChild(document.createTextNode(`${++targetNum}`));
    dispatch(nodeChanged({ row, col, att: "isMidway", val: !isMidway }));
    window.targetNodes.push({ ...window.grid[row][col] });
  }

  function handleChaseMouseEnter() {
    if (isUnclickable() || isWall || isPath({ id }) || isDone) return;
    const { row: fRow, col: fCol } = window.finishNode;

    dispatch(nodeChanged({ row: fRow, col: fCol, att: "isFinish", val: false }));
    dispatch(nodeChanged({ row, col, att: "isFinish", val: true }));

    window.finishNode = window.grid[row][col];

    if (!window.targetNodes.length || !midwayActive) return;
    const { row: tRow, col: tCol } = window.targetNodes[window.targetNodes.length - 1];
    dispatch(nodeChanged({ row: tRow, col: tCol, att: "isMidway", val: true }));
  }

  const handleWallMouseEnter = () => {
    if (isUnclickable() || !window.mousePressedWall || (isRunning && !dynamicMode))
      return;
    dispatch(nodeChanged({ row, col, att: "isWall", val: !isWall }));
  };

  const handleMouseDown = ({ button }) => {
    if (button === 1) return;

    if (
      (!mouseChaseActive && isFinish) ||
      isStart ||
      midwayActive ||
      (isRunning && !dynamicMode)
    )
      return;
    window.mousePressedWall = true;

    if (mouseChaseActive) {
      dispatch(runtimeChanged({ att: "mouseChaseActive", val: false }));
      onChase = true;
    }
    dispatch(nodeChanged({ row, col, att: "isWall", val: !isWall }));
  };

  const handleMouseUp = ({ button }) => {
    if (button === 1) return;

    if (midwayActive || (isRunning && !dynamicMode)) return;
    onChase && dispatch(runtimeChanged({ att: "mouseChaseActive", val: true }));
    onChase = false;
    window.mousePressedWall = false;
  };

  function handleAuxClick() {
    dispatch(nodeChanged({ row, col, att: "weight", val: weight + 1 }));
  }

  // Mobile events

  function handlePointerDown(e) {
    let [pRow, pCol] = prevNode;

    if (pRow === row && pCol === col) return;
    prevNode = [row, col];
    e.target.releasePointerCapture(e.pointerId);

    if (isStart || isFinish) return handleDragStart(e);
    handleMouseDown(e);
  }
  function handlePointerEnter(e) {
    e.target.releasePointerCapture(e.pointerId);

    if (isDragging) handleDrop(e);
    else mouseChaseActive ? handleChaseMouseEnter(e) : handleWallMouseEnter(e);
  }

  function handlePointerUp(e) {
    e.target.releasePointerCapture(e.pointerId);

    if (isDragging) dispatch(uiChanged({ prop: "board", att: "isDragging", val: false }));

    handleMouseUp(e);
  }

  const isUnclickable = () =>
    (!isMaze && isBoundaryWall) || isStart || isFinish || isMidway;
  const className = isStart
    ? "start"
    : isFinish
    ? "finish"
    : isWall
    ? "wall"
    : isMidway
    ? "midway"
    : "node";

  return (
    <td
      id={id}
      onAuxClick={handleAuxClick}
      className={className}
      draggable={(isStart || isFinish) && !onChase}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={mouseChaseActive ? handleChaseMouseEnter : handleWallMouseEnter}
      onMouseUp={handleMouseUp}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onPointerDown={isMobile ? handlePointerDown : () => {}}
      onPointerEnter={isMobile ? handlePointerEnter : () => {}}
      onPointerUp={isMobile ? handlePointerUp : () => {}}
      style={{
        touchAction: "none",
        width: nodeSize,
        height: nodeSize,
        backgroundColor: className === "node" && custom.node.color,
        outline:
          isBorders && !isStart && !isFinish && !isMidway
            ? "0.5px solid rgba(179, 179, 179, .3)"
            : "0px",
        userSelect: "none",
        textAlign: "center",
        fontSize: `min(${Math.floor(nodeSize / 2)}px, 14px)`,
        cursor:
          !isUnclickable() && (!mouseChaseActive || isDone)
            ? "pointer"
            : (isStart || isFinish) && !mouseChaseActive
            ? "grab"
            : mouseChaseActive
            ? "none"
            : "",
      }}>
      {weight > 1 && weight}
    </td>
  );
};

export default React.memo(Node);
