import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../helpers/const";

export const ClientContext = React.createContext();

const INIT_STATE = {
  products: null,
  cartCount: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload }; // payload это ключ products с данными response.data
    case "ADD_PRODUCT_TO_CART":
      return { ...state, cartCount: action.payload };
    default:
      return state;
  }
};

const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      const response = await axios(`${API}/${window.location.search}`);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // !PAGINATION

  const productsPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (state.products) {
      setPosts(state.products);
    }
  }, [state.products]);

  // переход по страницам
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = posts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductsCount = posts.length;

  // ! CART
  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let productCart = {
      product: product,
      count: 1,
      subPrice: product.price,
    };
    cart.products.push(productCart);
    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));

    let action = {
      type: "ADD_PRODUCT_TO_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
      };
    }
    let check = cart.products.find((item) => {
      return item.product.id === id;
    });
    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ClientContext.Provider
      value={{
        getProducts,
        setCurrentPage,
        addProductToCart,
        checkProductInCart,
        products: currentProducts,
        totalProductsCount,
        productsPerPage,
        currentPage,
        cartCount: state.cartCount,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
