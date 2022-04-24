import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";

const ListButton = ({ label, handleClick, startIcon = null, endIcon = null }) => {
  const { runningFunc, dynamicMode } = useSelector(({ runtime }) => runtime);
  const { algo, type } = runningFunc;

  const isAStar = ["Manhattan Distance", "Diagonal Distance"].includes(label);
  const isDynamicMode = label === "Dynamic Path-Finding";
  const isActive =
    algo === label || type + " Distance" === label || (isDynamicMode && dynamicMode);

  return (
    <ListItemButton
      onClick={handleClick}
      sx={{
        display: "flex",
        justifyContent: "center",
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
      {isDynamicMode && !isActive && (
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
      )}
      {startIcon}
      <span
        style={{
          fontWeight: 200,
          fontSize: 14,
          padding: 5,
          paddingLeft: 20,
        }}>
        {label}
      </span>
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          order: 2,
        }}>
        {endIcon}
      </div>
    </ListItemButton>
  );
};

export default ListButton;
