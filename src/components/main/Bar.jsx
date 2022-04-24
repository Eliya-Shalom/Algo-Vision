import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Bar.css";

const Bar = ({ id, height, width, color, zIndex }) => {
  const isSorted = useSelector(({ runtime }) => runtime.isSorted);
  const [hover, setHover] = useState(false);

  const extraClass = isSorted ? "sorted" : "";

  function handleHover() {
    setHover(true);
  }

  function handleMouseOut() {
    setTimeout(() => setHover(false), 300);
  }

  return (
    <div
      id={id}
      className={`bar ${extraClass}`}
      onMouseEnter={handleHover}
      onMouseOut={handleMouseOut}
      style={{
        height,
        width,
        zIndex,
        cursor: "pointer",
        transform: hover ? "scale(1.2)" : "scale(1)",
        transition: "transform: 0.5s, background 0s",
      }}
    />
  );
};

export default Bar;
