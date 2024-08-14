import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Page from "../../components/page";
import { useEffect, useState } from "react";

import axios from "../../utils/axios";
import { useAuth } from "../../hooks/useAuth";

const History = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      // @ts-ignore
      .get(`orders?userId=${user.id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar o histórico de pedidos:", error);
      });
  }, []);

  const isNotFound = !orders.length;

  return (
    <Page title="Histórico">
      <Container maxWidth="lg">
        <Card sx={{ pt: 5, px: 5 }}>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px grey`,
                  "& th": { backgroundColor: "transparent" },
                }}
              >
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Descrição do pedido</TableCell>
                  <TableCell align="left">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((row) => {
                  const { id, userId, items, total } = row;
                  const products = items
                    // @ts-ignore
                    .map((item: any) => item.name)
                    .join(", ");

                  return (
                    <TableRow key={id}>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {id}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">{userId}</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                            noWrap
                          >
                            {products}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{total}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Typography sx={{ marginBottom: 3 }}>
                        Nenhum pedido registrado
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Page>
  );
};

export default History;
