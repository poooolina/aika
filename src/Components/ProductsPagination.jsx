import { Pagination } from "@mui/material";
import React, { useContext } from "react";
import { ClientContext } from "../Contexts/ClientProvider";

const ProductsPagination = () => {
  const { productsPerPage, totalProductsCount, setCurrentPage } =
    useContext(ClientContext);
  const count = Math.ceil(totalProductsCount / productsPerPage);
  return (
    <div className="products-pagination">
      <Pagination
        onChange={(event, value) => setCurrentPage(value)}
        count={count}
        color="primary"
      />
    </div>
  );
};

export default ProductsPagination;
