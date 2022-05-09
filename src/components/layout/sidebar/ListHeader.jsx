import React from "react";
import { useSelector } from "react-redux";
import { ListItem, ListItemText } from "@mui/material";

const ListHeader = ({ label }) => {
  const { sideMenu } = useSelector(({ ui }) => ui);

  return (
    <ListItem
      sx={{
        borderBottom: ({ palette }) =>
          !sideMenu.open &&
          label !== "Path Finding" &&
          `1px solid ${palette.secondary.main}`,
      }}>
      <ListItemText
        sx={{ display: !sideMenu.open && "none" }}
        primary={label}
        primaryTypographyProps={{
          pl: 1,
          fontSize: 12,
          color: label !== "Special" ? "grey.500" : "secondary.main",
          whiteSpace: "nowrap",
        }}
      />
    </ListItem>
  );
};

export default ListHeader;
