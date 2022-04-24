import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, IconButton, Toolbar } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import JavascriptOutlinedIcon from "@mui/icons-material/JavascriptOutlined";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { uiChanged } from "../../store/ui";
import snippets from "../../algorithms/snippets";

const SourceCode = () => {
  const dispatch = useDispatch();
  const { runningFunc } = useSelector(({ runtime }) => runtime);
  const { isSnippetOpen } = useSelector(({ ui }) => ui);
  const { algo, type } = runningFunc;

  const editorEle = document.getElementById("editor");

  function getSnippet() {
    if (!algo) return "";
    const snippet = snippets.find((snippet) => snippet.algo === algo);
    if (algo === "aStar") return snippet[type].code;
    return snippet.code;
  }

  function handleClick() {
    dispatch(uiChanged({ att: "isSnippetOpen", val: false }));
  }

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isSnippetOpen}
      transitionDuration={1000}
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
              opacity: isSnippetOpen ? 1 : 0,
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

export default SourceCode;
