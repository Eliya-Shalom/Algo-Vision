import { Box, CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";
import { Provider } from "react-redux";
import Layout from "./components/layout/Layout";
import Main from "./components/main/Main";
import Panel from "./components/layout/visual-settings/Panel";
import theme from "./context/Theme";
import "./utils/globalVars";
import "./App.css";

import rootReducer from "./store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import Logo from "./components/common/Logo";

const store = configureStore({ reducer: rootReducer });

let isMobile = /Mobi|Android/i.test(navigator.userAgent);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box display="flex" width="100vw" height="95vh" overflow="hidden">
          <CssBaseline />
          {isMobile ? (
            <Stack
              display="flex"
              width="100%"
              textAlign="center"
              alignSelf="center"
              justifyContent="center"
              p={2}>
              <Typography variant="h5" fontWeight="600" pb={2}>
                AlgoVision is currently for Desktop users only
              </Typography>
              <Typography variant="p" pb={2}>
                I'm working on mobile responsiveness as soon as possible.
              </Typography>
              <Box bgcolor="secondary.main" p={1}>
                <Logo handleClick={() => {}} />
              </Box>
            </Stack>
          ) : (
            <Layout>
              <Panel />
              <Main />
            </Layout>
          )}
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
