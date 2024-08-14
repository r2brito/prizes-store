import { FC } from "react";
import { Box, Card, Stack, Typography, CardContent } from "@mui/material";

interface CheckoutSummaryProps {
  total: number;
}

// ----------------------------------------------------------------------

const CheckoutSummary: FC<CheckoutSummaryProps> = ({ total }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle1" sx={{ color: "error.main" }}>
                {total}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CheckoutSummary;
