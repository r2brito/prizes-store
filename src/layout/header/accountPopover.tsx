import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Divider, Typography, MenuItem, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import Popover from "@mui/material/Popover";
import { useAuth } from "../../hooks/useAuth";

export default function AccountPopover() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Avatar
          alt={user?.name}
          src={
            // @ts-ignore
            user?.cover
          }
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            {user?.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            {user?.balance} pontos
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, color: "error.main", textAlign: "center" }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
