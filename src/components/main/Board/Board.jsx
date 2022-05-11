import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Node from "./Node";
import useResizeGrid from "../../../hooks/useResizeGrid";
import { copyGrid } from "../../../utils/boardUtils";
import "./Board.css";

const Board = () => {
  const { dimensions, grid } = useSelector(({ board }) => board);
  const { rotateX, rotateY, rotateZ, perspective, scale } = useSelector(
    ({ ui }) => ui.threeD
  );
  const { height, width } = dimensions;
  const containerRef = useRef();

  useResizeGrid(containerRef);

  window.grid = copyGrid(grid);

  return (
    <div
      id="table-container"
      ref={containerRef}
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
                    {row.map((node) => {
                      const boundaryWall =
                        node.row === 0 ||
                        node.row === grid.length - 1 ||
                        node.col === 0 ||
                        node.col === grid[0].length - 1;
                      return (
                        <Node
                          id={node.id}
                          key={node.id}
                          row={node.row}
                          col={node.col}
                          prevNode={node.prevNode}
                          walls={node.walls}
                          isWall={node.isWall}
                          isMidway={node.isMidway}
                          weight={node.weight}
                          isBoundaryWall={boundaryWall}
                          isStart={node.isStart}
                          isFinish={node.isFinish}
                        />
                      );
                    })}
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
