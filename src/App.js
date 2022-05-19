import { useSelector } from "react-redux";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/layout/Layout";
import getTheme from "./context/theme";
import "./utils/globalVars";
import "./App.css";

function App({ children }) {
  const { colorMode } = useSelector(({ ui }) => ui);

  return (
    <ThemeProvider theme={getTheme(colorMode)}>
      <Box display="flex" width="100vw" height="100vh" overflow="hidden">
        <CssBaseline />
        <Layout children={children} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
