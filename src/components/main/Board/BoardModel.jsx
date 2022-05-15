import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import NodeModel from "./NodeModel";
import useResizeGrid from "../../../hooks/useResizeGrid";
import "./Board.css";
import { useNavigate } from "react-router-dom";

let animFrame;
let deg = 0;

const Board = () => {
  const navigate = useNavigate();
  const { grid, dimensions } = useSelector(({ board }) => board);
  const { perspective } = useSelector(({ ui }) => ui.threeD);
  const { isMobile, screen } = useSelector(({ ui }) => ui);
  const { height, width } = dimensions;

  const containerRef = useRef();
  const [rotate, setRotate] = useState(deg);

  useResizeGrid(containerRef);

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
    navigate("Path-finding");
  }

  return (
    <Box
      id="table-container"
      ref={containerRef}
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        width: "110%",
        height: isMobile ? "110%" : "90%",
        m: "0 auto",
        mt: !isMobile || screen.orientation === "landscape" ? 0 : "-15vh",
      }}>
      <div
        id="rect-container"
        className="rect-container"
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
              <tbody>
                {grid.map((row, i) => (
                  <tr key={i}>
                    {row.map((node) => (
                      <NodeModel key={node.id} row={node.row} col={node.col} />
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
    </Box>
  );
};

export default Board;
