import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";

const ListButton = ({ label, handleClick, startIcon = null, endIcon = null }) => {
  const { runningFunc, dynamicMode } = useSelector(({ runtime }) => runtime);
  const { sideMenu } = useSelector(({ ui }) => ui);
  const { algo, type } = runningFunc;

  const isDynamicMode = label === "Dynamic Path-Finding";
  const isAStar = ["Manhattan Distance", "Diagonal Distance"].includes(label);
  const isActive =
    algo === label || type + " Distance" === label || (isDynamicMode && dynamicMode);
  const specialTag = (
    <Box
      sx={{
        position: "absolute",
        left: "0%",
        top: "0%",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "25px 25px 0px 0px",
        borderColor: "transparent transparent transparent transparent",
        borderTopColor: "secondary.main",
      }}
    />
  );

  return (
    <ListItemButton
      onClick={handleClick}
      sx={{
        display: "flex",
        "&:hover": {
          bgcolor: isAStar && !isActive ? "primary.lighter" : "primary.dark",
          color: "secondary.light",
        },
        bgcolor: isActive ? "primary.dark" : isAStar ? "primary.light" : "primary.main",
        color: isActive ? "secondary.light" : "grey.100",
        transition: "0.3s",
        borderLeft: isActive ? "5px solid" : "",
        borderColor: "secondary.main",
      }}>
      {isDynamicMode && !isActive && specialTag}
      <Box display="flex" alignItems="center" children={startIcon} />
      <Typography
        noWrap
        sx={{
          fontWeight: 200,
          fontSize: 14,
          p: 1,
          pl: 1.5,
          opacity: sideMenu.open ? 1 : 0,
          transition: "opacity 0.5s",
        }}>
        {label}
      </Typography>
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          order: 2,
        }}>
        {sideMenu.open && endIcon}
      </div>
    </ListItemButton>
  );
};

export default ListButton;
