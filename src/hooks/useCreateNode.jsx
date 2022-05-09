import React, { useEffect, useRef, useState } from "react";
import { createNode } from "../utils/boardUtils";

const useCreateNode = ({ rows, cols }) => {
  const [grid, setGrid] = useState([]);
  
  function createGrid(rows, cols) {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
      newGrid.push([]);
      for (let col = 0; col < cols; col++) {
        // const nodeRef = useRef();
        const node = createNode(row, col);

        const boundaryWall =
          row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
        if (boundaryWall) node.isWall = true;

        newGrid[row].push(node);
      }
    }
    setGrid(newGrid);
    // return grid;
  }

  useEffect(() => createGrid(rows, cols), []);

  return grid;
};

export default useCreateNode;
