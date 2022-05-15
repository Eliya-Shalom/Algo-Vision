import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { axleChanged } from "../../../store/axle";
import { runtimeChanged, snapshotTook } from "../../../store/runtime";
import { animateShuffleAxle } from "../../../utils/axleUtils";
import { resetIndicators } from "../../../utils/commonUtils";
import ActionBtn from "../../common/ActionBtn";

const ShuffleBtn = () => {
  const dispatch = useDispatch();
  const { isRunning, isShuffling, isDone } = useSelector(({ runtime }) => runtime);
  const { axle } = useSelector(({ axle }) => axle);
  const [deg, setDeg] = useState(720);

  async function handleClick() {
    setDeg(deg + 720);

    batch(() => {
      resetIndicators(dispatch);
      dispatch(runtimeChanged({ att: "isShuffling", val: true }));
      isDone && dispatch(runtimeChanged({ att: "isDone", val: false }));
    });
    
    window.hasAborted = false;
    const shuffled = await animateShuffleAxle(axle, dispatch);

    batch(() => {
      dispatch(axleChanged({ att: "axle", val: shuffled }));
      dispatch(snapshotTook({ category: "sort", val: { swaps: [], idx: 0 } }));
      dispatch(runtimeChanged({ category: "sort", att: "isShuffling", val: false }));
    });
  }
  const disabled = isRunning || isShuffling;
  const iconStyle = {
    fontSize: 30,
    transform: `rotate(-${deg}deg)`,
    transition: "transform 1.5s",
    color: isRunning || isShuffling ? "grey.300" : "secondary.main",
  };

  return (
    <ActionBtn
      children={<ShuffleIcon sx={iconStyle} />}
      disabled={disabled}
      handleClick={handleClick}
      label="Shuffle"
      tooltip="Shuffle Axle"
    />
  );
};

export default ShuffleBtn;
