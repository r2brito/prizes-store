import { useCallback, useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import Page from "../../components/page";
import axios from "../../utils/axios";
import ProductCard from "../../sections/products/productCard";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <Page title="Home">
      <Container maxWidth={"lg"}>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {(!products.length ? [...Array(12).keys()] : products).map(
            (product, index) => (
              // @ts-ignore
              <ProductCard product={product} index={index} />
            )
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default Product;
