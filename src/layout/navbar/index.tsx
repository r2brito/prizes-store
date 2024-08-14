import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import { NavSection } from "../../components/nav-section";

import navConfig from "./config";

const RootStyle = styled("div")(({ theme }) => ({
  transition: theme.transitions.create("top", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: "100%",
  position: "fixed",
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  top: 90,
  backgroundColor: theme.palette.background.default,
}));

const Navbar: React.FC = () => {
  return (
    <RootStyle>
      <Container>
        <NavSection navConfig={navConfig} />
      </Container>
    </RootStyle>
  );
};

export default memo(Navbar);
