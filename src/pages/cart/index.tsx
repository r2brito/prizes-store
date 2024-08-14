import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Grid, Card, Button, Container } from "@mui/material";

import sum from "lodash/sum";

import Iconify from "../../components/icon";

import CheckoutSummary from "../../sections/checkout/checkoutSummary";
import CheckoutProductList from "../../sections/checkout/checkoutProductList";
import { useCart } from "../../hooks/useCart";

import axios from "../../utils/axios";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Page from "../../components/page";

export default function CheckoutCart() {
  const { user, updateBalance } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const isEmptyCart = cart.length === 0;

  const total = sum(cart.map((cartItem) => cartItem.points));

  const payment = Number(user?.balance) - Number(total);
  const handleCheckout = async () => {
    try {
      const newOrder = {
        // @ts-ignore
        userId: user.id,
        items: cart,
        total,
      };

      await axios.post("/orders", newOrder);
      toast.success("Pedido Finalizado com Sucesso!");
      updateBalance(payment);
      clearCart();
      navigate("/main/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Carrinho">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              {!isEmptyCart && <CheckoutProductList products={cart} />}
            </Card>

            <Button
              color="inherit"
              component={RouterLink}
              to="/main/products"
              startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
            >
              Continue Comprando
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary total={total} />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Finalizar Pedido
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
