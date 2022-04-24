import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import NodeModel from "./NodeModel";
import { runtimeChanged } from "../../store/runtime";
import { dimensionsChanged } from "../../store/board";
import { generateGrid } from "../../utils/boardUtils";
import { getSizeByRef } from "../../utils/commonUtils";
import "./Board.css";

let resizeTimeout;
let tableTimeout;
let animFrame;
let deg = 0;

const Board = () => {
  const dispatch = useDispatch();
  const {
    grid,
    view: { perspective, isReset },
    dimensions: { height, width, nodeSize },
  } = useSelector(({ board }) => board);
  const tableRef = useRef();
  const tableContainerRef = useRef();

  const [rotate, setRotate] = useState(deg);

  const resetTableSize = () => {
    const [currentMaxHeight, currentMaxWidth] = getSizeByRef(tableContainerRef);
    batch(() => {
      dispatch(dimensionsChanged({ att: "height", val: currentMaxHeight }));
      dispatch(dimensionsChanged({ att: "width", val: currentMaxWidth }));
    });
  };
  useEffect(resetTableSize, [isReset]);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => resetTableSize(), 200);
  });

  useEffect(() => {
    clearTimeout(tableTimeout);
    tableTimeout = setTimeout(() => generateGrid(height, width, nodeSize, dispatch), 100);
    return () => {
      clearTimeout(tableTimeout);
      clearTimeout(resizeTimeout);
    };
  }, [height, width]);

  useEffect(() => {
    animFrame = window.requestAnimationFrame(spinBoard);
    return () => window.cancelAnimationFrame(animFrame);
  }, [grid]);

  function spinBoard() {
    deg += 0.5;
    setRotate(deg);
    animFrame = window.requestAnimationFrame(spinBoard);
  }

  function handleClick() {
    dispatch(
      runtimeChanged({
        att: "runningFunc",
        val: { algo: "", type: "", category: "path" },
      })
    );
  }

  return (
    <div
      id="table-container"
      ref={tableContainerRef}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        className="rect-container"
        ref={tableContainerRef}
        style={{
          width,
          height,
          perspective,
          transform: `scale(${0.5})`,
        }}>
        <div
          className="rect"
          onClick={handleClick}
          style={{
            transform: `rotateX(${30}deg) rotateY(${rotate}deg)`,
            cursor: "pointer",
          }}>
          <div className="face front" style={{ width, height }}>
            <table className="table" style={{ height, width }}>
              <tbody ref={tableRef}>
                {grid.map((row, i) => (
                  <tr key={i}>
                    {row.map((node) => (
                      <NodeModel
                        key={node.id}
                        row={node.row}
                        col={node.col}
                        visitedMaze={node.visitedMaze}
                        visitedDijkstra={node.visitedDijkstra}
                        visitedDFS={node.visitedDFS}
                        visitedBFS={node.visitedBFS}
                        stacked={node.stacked}
                        walls={node.walls}
                        isWall={node.isWall}
                        isStart={node.isStart}
                        isFinish={node.isFinish}
                        prevNode={node.prevNode}
                        distanceFromStart={node.distanceFromStart}
                        estimatedDistanceToEnd={node.estimatedDistanceToEnd}
                        handleMouseDown={() => {}}
                        handleMouseEnter={() => {}}
                        handleMouseUp={() => {}}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="face back" style={{ width, height }} />
          <div className="face left" style={{ height }} />
          <div className="face top" style={{ width }} />
          <div
            className="face right"
            style={{
              height,
              transform: `rotateY(90deg) translateZ(${width - 15}px) translateX(15px)`,
            }}
          />
          <div
            className="face bottom"
            style={{
              width,
              transform: `rotateX(-90deg) translateZ(${height - 15}px) translateY(15px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
