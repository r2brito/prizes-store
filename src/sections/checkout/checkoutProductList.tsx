import { FC } from "react";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";
import Image from "../../components/image";
import Iconify from "../../components/icon";
import { useCart } from "../../hooks/useCart";

interface CheckoutProductListProps {
  products: any[];
}

const CheckoutProductList: FC<CheckoutProductListProps> = ({ products }) => {
  const { removeProduct } = useCart();

  const handleRemoveCart = (productId: string) => {
    removeProduct(productId);
  };

  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Prêmio</TableCell>
            <TableCell align="left">Pontos</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => {
            const { id, name, points, cover } = product;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      alt="product image"
                      src={cover}
                      sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
                    />
                    <Box>
                      <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ maxWidth: 240 }}
                      >
                        {name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{points}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => handleRemoveCart(id)}>
                    <Iconify
                      icon={"eva:trash-2-outline"}
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckoutProductList;
