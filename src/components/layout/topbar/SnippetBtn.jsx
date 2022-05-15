import React from "react";
import { useDispatch } from "react-redux";
import CodeIcon from "@mui/icons-material/Code";
import { uiChanged } from "../../../store/ui";
import ActionBtn from "../../common/ActionBtn";
import useGetCategoryAndAlgo from "../../../hooks/useGetCategoryAndAlgo";

const SnippetBtn = ({ typoStyle }) => {
  const dispatch = useDispatch();
  const [, algo] = useGetCategoryAndAlgo();

  function handleClick() {
    dispatch(uiChanged({ prop: "snippet", att: "open", val: true }));
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

export default SnippetBtn;
