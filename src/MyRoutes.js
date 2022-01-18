import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import AdminPage from "./Pages/AdminPage";
import AddPage from "./Pages/AddPage";
import EditPage from "./Pages/EditPage";
import DeteilPage from "./Pages/DeteilPage";
import CartPage from "./Pages/CartPage";
import Navbar from "./Components/Navbar";
import AdminProvider from "./Contexts/AdminProvider";
import ClientProvider from "./Contexts/ClientProvider";

const MyRoutes = () => {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin-panel" element={<AdminPage />} />
            <Route path="/admin-panel/add" element={<AddPage />} />
            <Route path="/admin-panel/edit/:id" element={<EditPage />} />
            <Route path="/product-detail/:id" element={<DeteilPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
};

export default MyRoutes;
