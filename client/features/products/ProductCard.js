import * as React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Work Sans"].join(","),
  },
  palette: {
    primary: {
      main: "#5b7b7a",
    },
  },
});

const ProductCard = ({
  imageUrl,
  name,
  description,
  productId,
  isAdmin,
  inventoryQty,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className="prod-card-img"
            component="img"
            height="300"
            image={imageUrl}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name && name.length >= 18 ? name.slice(0, 18) + "..." : name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description && description.length >= 25
                ? description.slice(0, 25) + "..."
                : description}
            </Typography>
            {isAdmin ? (
              <Typography variant="body2" color="text.secondary">
                Quantity: {inventoryQty}
              </Typography>
            ) : null}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={Link}
              to={`/products/${productId}`}
              key={productId}
              variant="contained"
              color="primary"
            >
              View Details
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
};

export default ProductCard;
