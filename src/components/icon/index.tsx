import { Icon } from "@iconify/react";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

type IconifyProps = {
  icon: React.ReactNode;
  sx?: SxProps<Theme>;
} & React.ComponentPropsWithoutRef<typeof Box>;

// Component
const Iconify: React.FC<IconifyProps> = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={sx} {...other} />;
};

export default Iconify;
