import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import Home from "./components/main/home/Home";
import Board from "./components/main/Board/Board";
import Axle from "./components/main/Axle/Axle";
import Main from "./components/main/Main";
import "./index.css";
import snippets from "./algorithms/snippets";
import NotFound from "./components/main/NotFound";

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="" element={<Home />} />
              <Route path="/Path-finding" element={<Board />} />
              {snippets.map(
                ({ algo }) =>
                  !algo.includes("Sort") && (
                    <Route key={algo} path={`Path-finding/${algo}`} element={<Board />} />
                  )
              )}
              <Route path="Sorting" element={<Axle />} />
              {snippets.map(
                ({ algo }) =>
                  algo.includes("Sort") && (
                    <Route key={algo} path={`Sorting/${algo}`} element={<Axle />} />
                  )
              )}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </App>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
