import { Box } from "@mui/system";
import { Divider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const TitleDivider = ({ title, children }) => {
  const { isMobile } = useSelector(({ ui }) => ui);
  return (
    <Stack height="100%">
      {!isMobile && (
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
      )}
      <Box display="flex" justifyContent="center" height="100%">
        {children}
      </Box>
    </Stack>
  );
};

export default TitleDivider;
