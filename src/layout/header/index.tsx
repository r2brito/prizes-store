import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Stack, MenuItem, Box } from "@mui/material";
import AccountPopover from "./accountPopover";

const RootStyle = styled(
  AppBar,
  {}
)(({ theme }) => ({
  boxShadow: "none",
  height: 88,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  backgroundColor: theme.palette.background.default,
}));

export default function Header() {
  return (
    <RootStyle>
      <>
        <Stack
          sx={{
            width: 50,
            margin: 2,
          }}
          direction="column"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </>
    </RootStyle>
  );
}
