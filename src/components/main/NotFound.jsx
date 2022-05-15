import { Box, Stack, Typography } from "@mui/material";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import React from "react";

const NotFound = () => {
  return (
    <Stack
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={"-10vh"}>
      <EmojiPeopleIcon sx={{ fontSize: 40, mb: -10.5 }} />
      <Typography variant="h1" fontWeight="bold" noWrap>
        404
      </Typography>

      <Box display="flex" alignItems="flex-end">
        <Typography variant="h5" fontWeight="light" noWrap>
          There's nothing here...
        </Typography>
      </Box>
    </Stack>
  );
};

export default NotFound;
