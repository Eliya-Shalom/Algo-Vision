import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { runtimeChanged } from "../../../store/runtime";
import { weightGrid } from "../../../utils/boardUtils";

const WeightBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { grid } = useSelector(({ board }) => board);

  function handleClick() {
    weightGrid(grid, dispatch);
    dispatch(runtimeChanged({ att: "isPainted", val: true }));
  }

  // const disabled = isMazeRunning || isRunning || isMaze;

  return (
    <Tooltip
      title={`Fill the grid with randon weights.
              To set single node weight, click on the middle mouse button.`}>
      <Stack>
        <IconButton disabled={false} onClick={handleClick} sx={{ p: 0 }}>
          <FitnessCenterRoundedIcon
            sx={{
              fontSize: 30,
              color: false ? "grey.500" : "secondary.main",
            }}
          />
        </IconButton>

        <Typography
          variant="button"
          color="primary.light"
          noWrap
          sx={typoStyle}
          pt={0.5}
          children="Weights"
        />
      </Stack>
    </Tooltip>
  );
};

export default WeightBtn;
