import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, ContentHeader } from "./components/index.js"; // Your custom sidebar

import "./styles/AuthLayoutStyles.css"; // Custom styles for the authenticated layout

const AuthenticatedLayout = () => {
  return (
    <div className="auth-layout">
      <Sidebar /> {/* Sidebar */}
      <div className="main-content">
        <ContentHeader /> {/* Content Header */}
        <div className="content-body">
          <Outlet /> {/* This will render the actual page content */}
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
