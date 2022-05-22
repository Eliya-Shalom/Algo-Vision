import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const getPalette = (mode) => ({
  // mode,
  ...(mode === "light"
    ? {
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
        custom: {
          nodeColor: "#FFFFFF",
        },
      }
    : {
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
      }),
});

export default function getTheme(mode) {
  const isLightMode = mode === "light";

  return createTheme({
    palette: getPalette(mode),
    shadows: [
      "none",
      `0px 0px 10px -3px  ${mode === "light" ? grey[500] : "transparent"}`,
    ],
    typography: {
      fontFamily: "Sora",
      fontWeightLight: 200,
      fontWeightMedium: 300,
      fontWeightRegular: 400,
      fontWeightBold: 500,
    },
    custom: {
      main: {
        background: isLightMode ? "#F3F5FA" : "#151221",
      },
      node: {
        color: isLightMode ? "#FFFFFF" : "#7770a9",
        mazeWallColor: !isLightMode ? "#2E2659" : "#2E2659",
      },
      topBar: {
        background: isLightMode ? "#FFFFFF" : "#232843",
        textColor: !isLightMode ? grey[300] : "#251f47",
      },
    },
  });
}
