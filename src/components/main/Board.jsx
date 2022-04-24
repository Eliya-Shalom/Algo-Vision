import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Node from "./Node";
import { boardResized } from "../../store/board";
import { generateGrid } from "../../utils/boardUtils";
import { getSizeByRef } from "../../utils/commonUtils";
import "./Board.css";

let resizeTimeout;
let tableTimeout;

const Board = () => {
  const dispatch = useDispatch();
  const { dimensions, grid, view } = useSelector(({ board }) => board);
  const { rotateX, rotateY, rotateZ, perspective, scale } = view;
  const { height, width, nodeSize } = dimensions;

  const tableContainerRef = useRef();

  const resetTableSize = () => {
    const [currentMaxHeight, currentMaxWidth] = getSizeByRef(tableContainerRef);
    dispatch(boardResized({ height: currentMaxHeight, width: currentMaxWidth }));
  };

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resetTableSize, 200);
  });

  useEffect(resetTableSize, [view.isReset]);
  useEffect(() => {
    clearTimeout(tableTimeout);
    tableTimeout = setTimeout(() => generateGrid(height, width, nodeSize, dispatch), 100);
    return () => {
      clearTimeout(tableTimeout);
      clearTimeout(resizeTimeout);
    };
  }, [height, width, nodeSize]);

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
        style={{
          width,
          height,
          perspective,
          transform: `scale(${scale})`,
        }}>
        <div
          className="rect"
          style={{
            transform: `rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        rotateZ(${rotateZ}deg)`,
          }}>
          <div className="face front" style={{ width, height }}>
            <table
              className="table"
              style={{ height, width }}
              cellPadding="0"
              cellSpacing="0">
              <tbody>
                {grid.map((row, i) => (
                  <tr key={i}>
                    {row.map((node) => (
                      <Node
                        id={node.id}
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

export default React.memo(Board);
