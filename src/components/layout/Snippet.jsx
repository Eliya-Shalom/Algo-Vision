import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, IconButton, Toolbar } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import JavascriptOutlinedIcon from "@mui/icons-material/JavascriptOutlined";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { uiChanged } from "../../store/ui";
import snippets from "../../algorithms/snippets";
import useGetCategoryAndAlgo from "../../hooks/useGetCategoryAndAlgo";

const Snippet = () => {
  const dispatch = useDispatch();
  const { snippet, isMobile } = useSelector(({ ui }) => ui);
  const [, algo] = useGetCategoryAndAlgo();

  const editorEle = document.getElementById("editor");

  function getSnippet() {
    if (!algo) return "";

    const snippet = snippets.find((snippet) => snippet.algo === algo);

    if (!snippet) return;

    return snippet.code;
  }

  function handleClick() {
    dispatch(uiChanged({ prop: "snippet", att: "open", val: false }));
  }
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      transitionDuration={1000}
      open={snippet.open}
      sx={{
        "& .MuiDrawer-paper": {
          border: 0,
          width: "fit-content",
          bgcolor: "#282C34",
        },
      }}>
      <Toolbar variant="dense" sx={{ bgcolor: "#1E2227" }}>
        <IconButton onClick={handleClick}>
          <KeyboardArrowRight
            sx={{
              fontSize: 30,
              color: "grey.300",
              opacity: snippet.open ? 1 : 0,
              transition: "1s",
            }}
          />
        </IconButton>
        <JavascriptOutlinedIcon sx={{ fontSize: 40, color: "grey.300" }} />
      </Toolbar>
      <div
        id="editor"
        style={{
          height: "90%",
          width: "fit-content",
          backgroundColor: "#282C34",
          overflow: "hidden",
        }}>
        <CodeMirror
          id="code"
          style={{ fontSize: isMobile && 12, maxWidth: "100vw" }}
          value={getSnippet()}
          height={editorEle ? window.getComputedStyle(editorEle).height : "100%"}
          extensions={[javascript()]}
          theme="dark"
          editable={false}
        />
      </div>
    </Drawer>
  );
};

export default Snippet;
