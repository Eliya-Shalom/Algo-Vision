import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { runtimeChanged } from "../../../store/runtime";
import ActionBtn from "../../common/ActionBtn";

const MidwayBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { midwayActive } = useSelector(({ runtime }) => runtime);

  function handleClick() {
    dispatch(runtimeChanged({ att: "midwayActive", val: !midwayActive }));
  }

  const style = {
    main: { fontSize: 30, transition: "all 0.5s", borderRadius: 50 },
    active: { color: "white", bgcolor: "error.light" },
    notActive: { color: "error.light" },
  };

  return (
    <ActionBtn
      handleClick={handleClick}
      typoStyle={{ ...typoStyle, fontWeight: midwayActive && "bold" }}
      label="MIDWAY"
      tooltip={`When active, new midway nodes can be placed across the grid, to be
                reached by the algorithm. new points can be created before/during the animation.`}
      children={
        <AddLocationIcon
          style={style.main}
          sx={midwayActive ? style.active : style.notActive}
        />
      }
    />
  );
};

export default MidwayBtn;
