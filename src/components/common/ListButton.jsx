import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { Link, useLocation } from "react-router-dom";

const ListButton = ({ label, handleClick, startIcon = null, endIcon = null }) => {
  const location = useLocation();
  const { sideMenu } = useSelector(({ ui }) => ui);

  const category = label.includes("Sort") ? "Sorting" : "Path-finding";
  const [, , , algo] = location.pathname.split("/");

  const dynamicMode = algo === "Dynamic-Path-finding" && label === "Dynamic-Path-finding";
  const isAStar = ["Manhattan-Distance", "Diagonal-Distance"].includes(label);
  const isActive = algo === label || algo === "A*-Algorithm-" + label || dynamicMode;
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
    <Link
      to={
        label === "A*-Algorithm"
          ? location.pathname
          : `/Algo-Vision/${category}/${isAStar ? "A*-Algorithm-" + label : label}`
      }>
      <ListItemButton
        onClick={() => handleClick(label)}
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
        {dynamicMode && !isActive && specialTag}
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
    </Link>
  );
};

export default ListButton;
