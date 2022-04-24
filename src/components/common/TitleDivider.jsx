import { Box } from "@mui/system";
import { Divider, Stack, Typography } from "@mui/material";

const TitleDivider = ({ title, children }) => {
  return (
    <Stack>
      <Box>
        <Divider flexItem variant="middle">
          <Typography
            variant="button"
            color="secondary.dark"
            textAlign="center"
            fontSize={10}>
            {title}
          </Typography>
        </Divider>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
        {children}
      </Box>
    </Stack>
  );
};

export default TitleDivider;
