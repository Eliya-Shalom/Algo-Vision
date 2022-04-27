import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeIcon from "@mui/icons-material/Code";
import { uiChanged } from "../../../store/ui";
import ActionBtn from "../../common/ActionBtn";

const CodeBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const { algo } = useSelector(({ runtime }) => runtime.runningFunc);

  function handleClick() {
    dispatch(uiChanged({ att: "isSnippetOpen", val: true }));
  }

  return (
    <ActionBtn
      handleClick={handleClick}
      typoStyle={typoStyle}
      label="SOURCE-CODE"
      tooltip={` ${
        algo === "aStar" ? "A* Algorithm" : algo ? algo : "Algorithm's"
      } implementation in JavaScript`}
      children={<CodeIcon sx={{ fontSize: 30, color: "secondary.main" }} />}
    />
  );
};

export default CodeBtn;
