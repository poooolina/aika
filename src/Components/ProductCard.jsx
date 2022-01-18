import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.item.image}
        alt="green iguana"
        style={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography
          style={{ height: 60, overflow: "hidden" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {props.item.name}
        </Typography>
        <hr />
        <Typography variant="body2" color="text.secondary">
          Цена:{props.item.price}
          <br />
          Бренд:{props.item.brand}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          В корзину
        </Button>
        <Link
          style={{ marginLeft: 15 }}
          to={`/product-detail/${props.item.id}`}
        >
          <Button size="small" variant="contained">
            Подробнее...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
