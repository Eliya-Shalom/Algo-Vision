import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Bar.css";

const Bar = ({ id, height, width }) => {
  // const { isSorted } = useSelector(({ runtime }) => runtime);
  const { transition } = useSelector(({ axle }) => axle);
  const [hover, setHover] = useState(false);

  // const extraClass = isSorted ? "sorted" : "";

  function handleHover() {
    setHover(true);
  }

  function handleMouseOut() {
    setTimeout(() => setHover(false), 300);
  }

  return (
    <div
      id={id}
      className={`bar`}
      onMouseEnter={handleHover}
      onMouseOut={handleMouseOut}
      style={{
        height,
        width,
        cursor: "pointer",
        transform: hover ? "scale(1.1)" : "scale(1)",
        transition: transition && "all 0.25s",
      }}
    />
  );
};

export default Bar;
