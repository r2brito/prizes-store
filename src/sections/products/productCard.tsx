import { Link as RouterLink } from "react-router-dom";
import { Link, Card, Typography, CardContent } from "@mui/material";
import "../../styles/_products.scss";

interface ProductCardProps {
  product: {
    id: string;
    cover: string;
    name: string;
    points: number;
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { cover, id, name, points } = product;

  return (
    <Card className="product-card">
      <ProductContent id={id} name={name} points={points} />
      <img alt="cover" src={cover} className="image" />
    </Card>
  );
}

// ----------------------------------------------------------------------

interface ProductContentProps {
  id: string;
  name: string;
  points: number;
  index?: number;
}

export function ProductContent({
  id,
  name,
  points,
  index,
}: ProductContentProps) {
  return (
    <CardContent className="product-content">
      <Link
        className="name h5"
        to={`/main/product/${id}/detail`}
        color="inherit"
        component={RouterLink}
      >
        <Typography className="name h5">{name}</Typography>
      </Link>
      <Typography className="product-info subtitle2">
        {points} Pontos
      </Typography>
    </CardContent>
  );
}
