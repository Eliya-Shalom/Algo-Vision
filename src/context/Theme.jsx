import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: {
      main: "#181C2F",
      light: "#232843",
      lighter: "#2c3254",
      dark: "#090a11",
    },
    secondary: {
      main: "#735ED9",
      light: "#816edd",
      lighter: "#bcb4e4",
      dark: "#2e2659",
      dark2: "#40367d",
      darker: "#251f47",
    },
    text: {
      primary: "#735ED9",
      secondary: grey[300],
    },
    divider: grey[500],
    background: {
      default: "#DADCE0",
      paper: "#181C2F",
    },
  },
  shadows: ["none", `0px 0px 10px -3px ${grey[500]}`],
  typography: {
    fontFamily: "Sora",
    fontWeightLight: 200,
    fontWeightMedium: 300,
    fontWeightRegular: 400,
    fontWeightBold: 500,
  },
  breakpoints: { values: { xs: 400, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  custom: {
    leftMenuWidth: 250,
    sourceCodeWidth: 450,
    topBarHeight: 80,
    visualPanelHeight: 50,
  },
});
