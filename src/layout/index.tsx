import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Navbar from "./navbar";
import Header from "./header";

const MainStyle = styled(
  "main",
  {}
)(({ theme }) => ({
  paddingTop: 200,
  [theme.breakpoints.up("lg")]: {
    paddingTop: 20,
  },
}));

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Box
        component="main"
        sx={{
          pt: {
            lg: `200px`,
          },
        }}
      >
        <MainStyle>
          <Outlet />
        </MainStyle>
      </Box>
    </>
  );
};

export default Layout;
