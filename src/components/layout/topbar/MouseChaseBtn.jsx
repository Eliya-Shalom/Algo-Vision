import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MouseIcon from "@mui/icons-material/Mouse";
import { runtimeChanged } from "../../../store/runtime";
import ActionBtn from "../../common/ActionBtn";

const MouseChaseBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { mouseChaseActive } = useSelector(({ runtime }) => runtime);

  function handleClick() {
    dispatch(runtimeChanged({ att: "mouseChaseActive", val: !mouseChaseActive }));
  }

  const style = {
    main: { padding: "2px", fontSize: 30, transition: "all 0.5s", borderRadius: 50 },
    active: { color: "white", bgcolor: "info.main" },
    notActive: { color: "info.main" },
  };

  return (
    <ActionBtn
      handleClick={handleClick}
      typoStyle={{ ...typoStyle, fontWeight: mouseChaseActive && "bold" }}
      label="CHASE"
      tooltip={`When active, the algorithm will chase after the user mouse.
                walls/midway points can be created while active.`}
      children={
        <MouseIcon
          style={style.main}
          sx={mouseChaseActive ? style.active : style.notActive}
        />
      }
    />
  );
};

export default MouseChaseBtn;
