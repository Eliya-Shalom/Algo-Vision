import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardResized } from "../store/board";
import { initializeGrid } from "../utils/boardUtils";
import { getSizeByRef } from "../utils/commonUtils";

let resizeTimeout;
let tableTimeout;

const useResizeGrid = (containerRef) => {
  const dispatch = useDispatch();
  const { dimensions } = useSelector(({ board }) => board);
  const { isRunning } = useSelector(({ runtime }) => runtime);
  const { isReset } = useSelector(({ ui }) => ui.visualPanel);
  const { height, width, nodeSize } = dimensions;

  const resetTableSize = () => {
    if (isRunning) return;

    const [containerHeight, containerWidth] = getSizeByRef(containerRef);
    dispatch(
      boardResized({
        height: containerHeight,
        width: Math.floor(containerWidth * 0.9),
        maxWidth: containerWidth,
      })
    );
  };

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resetTableSize, 200);
  });

  useEffect(() => {
    resetTableSize();
    return () => {
      clearTimeout(resizeTimeout);
      clearTimeout(tableTimeout);
    };
  }, [isReset]);

  useEffect(() => {
    clearTimeout(tableTimeout);
    tableTimeout = setTimeout(
      () => initializeGrid(height, width, nodeSize, dispatch),
      100
    );
    return () => {
      clearTimeout(tableTimeout);
      clearTimeout(resizeTimeout);
    };
  }, [height, width, nodeSize]);
};

export default useResizeGrid;
