import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Card,
} from "@mui/material";

import Page from "../../components/page";
import axios from "../../utils/axios";
import { useCart } from "../../hooks/useCart";
import Image from "../../components/image";
import Iconify from "../../components/icon";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import CartWidget from "../../sections/widget";

const PRODUCT_DESCRIPTION = [
  {
    title: "100% Original",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    icon: "ic:round-verified",
  },
  {
    title: "10 Day Replacement",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    icon: "eva:clock-fill",
  },
  {
    title: "Year Warranty",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    icon: "ic:round-verified-user",
  },
];

export default function ProductDetails() {
  const { addProduct, cart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState<{
    id: string;
    name: string;
    cover: string;
    points: number;
  } | null>(null);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get("/products");
      const currentProduct = response.data.find(
        (product: any) => product.id === id
      );
      setProduct(currentProduct);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handleAddCart = () => {
    const verifyItemExistInCart = cart.find(
      // @ts-ignore
      (itemCart: any) => itemCart.id === product?.id
    );
    if (product) {
      if (verifyItemExistInCart) {
        toast.warn("Esse item já está no seu carrinho.");
      } else {
        addProduct(product);
      }
    }
  };

  const handleCheckout = () => {
    console.log("handleCheckout");
  };

  return (
    <Page title="Detalhes do Produto">
      <Container maxWidth="lg">
        <CartWidget />

        {product && (
          <>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6} lg={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      key={product.cover}
                      src={product.cover}
                      alt={product.name}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Stack spacing={2} sx={{ mt: { xs: 3, md: 0 } }}>
                    <Typography variant="h5" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="h6">
                      {product.points} pontos
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      sx={{ mt: 3 }}
                    >
                      <Button
                        fullWidth
                        size="large"
                        color="warning"
                        variant="contained"
                        startIcon={
                          <Iconify icon={"ic:round-add-shopping-cart"} />
                        }
                        onClick={handleAddCart}
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Adicionar
                      </Button>

                      <Button
                        fullWidth
                        size="large"
                        onClick={handleCheckout}
                        variant="contained"
                      >
                        Comprar
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Card>

            <Grid container spacing={3} sx={{ mt: 5, marginBottom: 10 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{ textAlign: "center" }}>
                    <Iconify
                      icon={item.icon}
                      width={40}
                      height={40}
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}
