import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { resetTimer } from "../../layout/topbar/Timer";
import { uiChanged } from "../../../store/ui";
import { runtimeChanged, snapshotTook, visualizingPlayed } from "../../../store/runtime";
import visualizePath from "../../../algorithms/path-finding/visualizePath";
import { isPath, cleanPrevAlgo } from "../../../utils/boardUtils";
import { nodeChanged } from "../../../store/board";
import "./Node.css";

let targetNum = 0;
let onChase = false;
let prevStartOrEnd = [0, 0];
let pRow;
let pCol;

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
  const { grid, dimensions } = useSelector(({ board }) => board);
  const { board, isMobile } = useSelector(({ ui }) => ui);
  const { mousePressedWall, isDragging, isBorders } = board;
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

  useEffect(() => (targetNum = window.targetNodes.length), [isDone, isPainted]);

  const handleDragStart = () => {
    prevStartOrEnd = [row, col];
    dispatch(uiChanged({ prop: "board", att: "isDragging", val: true }));

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
    if (isWall || isMidway || isStart || isFinish) return;
    const [prevRow, prevCol] = prevStartOrEnd;
    const { row: sRow, col: sCol } = window.startNode;
    let att;

    if (prevRow === sRow && prevCol === sCol) {
      window.startNode = grid[row][col];
      att = "isStart";
    } else {
      window.finishNode = grid[row][col];
      att = "isFinish";
    }
    batch(() => {
      dispatch(nodeChanged({ row, col, att, val: true }));
      dispatch(nodeChanged({ row: prevRow, col: prevCol, att, val: false }));
    });
    prevStartOrEnd = [row, col];

    if (dynamicMode) return;

    isPainted && cleanPrevAlgo(grid, dispatch);

    if (!runningFunc.algo || window.hasPaused || window.hasAborted) return;
    batch(() => {
      dispatch(visualizingPlayed());
      instantMode && dispatch(runtimeChanged({ att: "isRunning", val: false }));
    });

    const { algo, type } = runningFunc;

    visualizePath(algo, type, grid, snapshot.path, isMaze, dispatch, instantMode);
  };

  function handleClick() {
    if (!midwayActive || isUnclickable() || isWall) return;
    !isPainted && dispatch(runtimeChanged({ att: "isPainted", val: true }));
    document.getElementById(id).appendChild(document.createTextNode(`${++targetNum}`));
    dispatch(nodeChanged({ row, col, att: "isMidway", val: !isMidway }));
    window.targetNodes.push({ ...grid[row][col] });
  }

  function handleChaseMouseEnter() {
    if (isUnclickable() || isWall || isPath({ id }) || isDone) return;
    document.getElementById(window.finishNode.id).className = "node";
    window.finishNode = grid[row][col];
    document.getElementById(window.finishNode.id).className = "finish";
    if (!window.targetNodes.length || !midwayActive) return;
    const { id: tId } = window.targetNodes[window.targetNodes.length - 1];
    document.getElementById(tId).className = "midway";
  }

  const handleWallMouseEnter = () => {
    if (isUnclickable() || !mousePressedWall || (isRunning && !dynamicMode)) return;
    dispatch(nodeChanged({ row, col, att: "isWall", val: !isWall }));
  };

  const handleMouseDown = ({ button }) => {
    if (button === 1) return;

    if (isUnclickable() || midwayActive || (isRunning && !dynamicMode)) return;
    dispatch(uiChanged({ prop: "board", att: "mousePressedWall", val: true }));
    if (mouseChaseActive) {
      dispatch(runtimeChanged({ att: "mouseChaseActive", val: false }));
      onChase = true;
    }
    dispatch(nodeChanged({ row, col, att: "isWall", val: !isWall }));
  };

  const handleMouseUp = ({ button }) => {
    if (button === 1) return;

    if (mouseChaseActive || midwayActive || (isRunning && !dynamicMode)) return;
    !isPainted && dispatch(runtimeChanged({ att: "isPainted", val: true }));
    dispatch(uiChanged({ prop: "board", att: "mousePressedWall", val: false }));
    onChase && dispatch(runtimeChanged({ att: "mouseChaseActive", val: true }));
    onChase = false;
  };

  function handleAuxClick() {
    dispatch(nodeChanged({ row, col, att: "weight", val: weight + 1 }));
  }

  // Mobile events

  function handlePointerDown(e) {
    if (pRow === row && pCol === col) return;
    [pRow, pCol] = [row, col];
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

  const isUnclickable = () => isBoundaryWall || isStart || isFinish || isMaze || isMidway;
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
      draggable={isStart || isFinish}
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
        width: dimensions.nodeSize,
        height: dimensions.nodeSize,
        outline:
          isBorders && !isStart && !isFinish && !isMidway ? "0.5px solid #e0e0e0" : "0px",
        userSelect: "none",
        textAlign: "center",
        fontSize: 12,
        cursor:
          !isUnclickable() && (!mouseChaseActive || isDone)
            ? "pointer"
            : isStart || isFinish
            ? "grab"
            : mouseChaseActive
            ? "none"
            : "",
      }}>
      {weight > 1 && weight}
    </td>
  );
};

export default Node;
