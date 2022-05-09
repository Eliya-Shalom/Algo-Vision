import { Provider } from "react-redux";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/layout/Layout";
import Main from "./components/main/Main";
import theme from "./context/Theme";
import "./utils/globalVars";
import "./App.css";

import rootReducer from "./store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: rootReducer });

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box display="flex" width="100vw" height="100vh" overflow="hidden">
          <CssBaseline />
          <Layout>
            <Main />
          </Layout>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
