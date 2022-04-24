import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initAxle } from "../../utils/axleUtils";
import { axleChanged } from "../../store/axle";
import Bar from "./Bar";

const Axle = () => {
  const dispatch = useDispatch();
  const { axle, numOfBars, align } = useSelector(({ axle }) => axle);
  const { rotateX, rotateY, rotateZ, perspective, scale } = useSelector(
    ({ board }) => board.view
  );

  useEffect(() => {
    const newAxle = initAxle(numOfBars);
    dispatch(axleChanged({ att: "axle", val: newAxle }));
  }, [numOfBars]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: align,
        justifyContent: "center",
        perspective,
        transform: `scale(${scale})`,
        marginTop: 5,
        transition: "transform 0.5s",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: align,
          justifyContent: "center",
          height: "85%",
          width: "100%",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
          transition: "transform 0.5s",
        }}>
        {axle.map(({ id, height, width }) => (
          <Bar key={id} id={id} height={`${height}%`} width={`${width}%`} />
        ))}
      </div>
    </div>
  );
};

export default Axle;
