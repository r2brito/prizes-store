import sum from "lodash/sum";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import Iconify from "../../components/icon";
import { useCart } from "../../hooks/useCart";

const RootStyle = styled(RouterLink)(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

export default function CartWidget() {
  const { cart } = useCart();

  return (
    <RootStyle to={"/main/cart"}>
      <Badge showZero badgeContent={cart.length} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}
