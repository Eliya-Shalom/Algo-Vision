import React from "react";
import { Box } from "@mui/material";
import Snippet from "./Snippet";
import Tutorial from "./Tutorial";
import TopBar from "./topbar/TopBar";
import SideMenu from "./sidebar/SideMenu";

const Layout = ({ children }) => {
  return (
    <Box display="flex" justifyContent="flex-end" width="100%" bgcolor="#F3F5FA">
      <TopBar />
      {children}
      <SideMenu />
      <Snippet />
      <Tutorial />
    </Box>
  );
};

export default Layout;
