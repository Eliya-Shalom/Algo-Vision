import React from "react";
import "./Bar.css";

const BarModel = ({ id, height, width, zIndex }) => {
  return (
    <div
      id={id}
      className="bar"
      style={{
        height,
        width,
        zIndex,
        cursor: "pointer",
        transition: "3s",
      }}
    />
  );
};

export default BarModel;
