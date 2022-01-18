import { Container } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import AdminTable from "../Components/AdminTable";

const AdminPage = () => {
  return (
    <div>
      <Container>
        <h2>Admin Page</h2>
        <AdminTable />
      </Container>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
