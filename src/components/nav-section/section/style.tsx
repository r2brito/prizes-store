import { styled } from "@mui/material/styles";
import { Button, Popover } from "@mui/material";

export const ListItemStyle = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "activeRoot" &&
    prop !== "activeSub" &&
    prop !== "subItem" &&
    prop !== "open",
})(({ activeRoot, activeSub, subItem, open, theme }: any) => {
  const activeRootStyle = {
    color: "#C4CDD5",
    backgroundColor: "#FFFFFF",
  };

  return {
    lineHeight: 22 / 14,
    fontSize: 14,
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0, 1),
    color: "#25649b",
    height: 50,
    "&:hover": {
      color: "#25649b",
      backgroundColor: "#FFFFFF",
    },
    // activeRoot
    ...(activeRoot && {
      ...activeRootStyle,
      "&:hover": { ...activeRootStyle },
    }),
    // activeSub
    ...(activeSub && {
      fontWeight: 600,
      lineHeight: 22 / 14,
      fontSize: 14,
      color: "#25649b",
    }),
    // subItem
    ...(subItem && {
      width: "100%",
      margin: 0,
      paddingRight: 0,
      paddingLeft: 10,
      justifyContent: "space-between",
    }),
    // open
    ...(open &&
      !activeRoot && {
        color: "#637381",
        backgroundColor: "#637381",
      }),
  };
});

// ----------------------------------------------------------------------

export const PaperStyle = styled(Popover)(({ theme }) => ({
  pointerEvents: "none",
  "& .MuiPopover-paper": {
    width: 160,
    pointerEvents: "auto",
    padding: theme.spacing(1),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    // boxShadow: "black",
  },
}));
