import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavbarHorizontal from "../navbar";

const MainLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: { lg: "flex" },
        minHeight: { lg: 1 }
      }}
    >
      <NavbarHorizontal />

      <Outlet />
    </Box>
  );
};

export default MainLayout;
