import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer } from "./components/index.js";
import { useSelector } from "react-redux";
import { Spinner } from "./components/index.js";
import "./styles/LayoutStyles.css";
import AuthenticatedLayout from "./AuthenticatedLayout.jsx";

function MainLayout() {
  const { loading } = useSelector((state) => state.alerts);
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();
  const isJobOpenRoute = location.pathname.includes("job-opening");

  return (
    <>
      {authStatus ? (
        <AuthenticatedLayout />
      ) : !isJobOpenRoute ? (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ) : (
        <>
          <Outlet />
        </>
      )}
      {loading && <Spinner />}
    </>
  );
}

export default MainLayout;
