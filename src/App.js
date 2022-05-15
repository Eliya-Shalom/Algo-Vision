import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/layout/Layout";
import theme from "./context/Theme";
import "./utils/globalVars";
import "./App.css";

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" width="100vw" height="100vh" overflow="hidden">
        <CssBaseline />
        <Layout>
          {children}
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
