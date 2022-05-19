import React, { useEffect, useState } from "react";
import BarModel from "./BarModel";
import { initAxle } from "../../../utils/axleUtils";
import { getRandomInt } from "../../../utils/commonUtils";
import { useNavigate } from "react-router-dom";

let i = 0;
let inter;

const Axle = () => {
  const [axleModel, setAxleModel] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const shuffledAxle = initAxle(100);
    setAxleModel(shuffledAxle);

    animWave(shuffledAxle);

    return () => {
      clearInterval(inter);
      i = 0;
    };
  }, []);

  function animWave(axle) {
    inter = setInterval(() => {
      const barEle = document.getElementById(axle[i++].id);
      if (!barEle) return;

      barEle.style.height = `${getRandomInt(0, 100)}%`;
      setTimeout(() => {
        barEle.style.height = "100%";
      }, 3000);
      setTimeout(() => {
        barEle.style.height = `${getRandomInt(0, 100)}%`;
      }, 6000);
      setTimeout(() => {
        barEle.style.height = "100%";
      }, 9000);
      if (i >= axle.length) i = 0;
    }, 50);
  }

  function handleClick() {
    navigate("Sorting");
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        transform: `scale(${1})`,
        transition: "all 0.5s",
      }}>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          transition: "all 0.5s",
        }}>
        {axleModel.map(({ id, _, width }) => (
          <BarModel key={id} id={id} height={0} width={`${width}%`} />
        ))}
      </div>
    </div>
  );
};

export default Axle;
