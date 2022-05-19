import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import { useDispatch, useSelector } from "react-redux";
import { runtimeChanged } from "../../../../store/runtime";
import { weightGrid } from "../../../../utils/boardUtils";
import ActionBtn from "../../../common/ActionBtn";

const WeightBtn = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);
  const { isMazeRunning, isRunning, isMaze } = useSelector(({ runtime }) => runtime);

  function handleClick() {
    weightGrid(grid, dispatch);
    dispatch(runtimeChanged({ att: "isPainted", val: true }));
  }
  const disabled = isMazeRunning || isRunning || isMaze;
  const iconStyle = {
    fontSize: 30,
    color: disabled ? "grey.500" : "secondary.main",
  };
  return (
    <ActionBtn
      children={<FitnessCenterRoundedIcon sx={iconStyle} />}
      disabled={disabled}
      handleClick={handleClick}
      label="Weights"
      tooltip={`Fill the grid with random weights.
              To set single node weight, click on the middle mouse button.
              repeat clicking to increase weight.`}
    />
  );
};

export default WeightBtn;
