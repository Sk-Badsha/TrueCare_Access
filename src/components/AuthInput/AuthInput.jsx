import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Cookies from "js-cookie";
import { message } from "antd";
import { logout } from "../../redux/features/authSlice.js";

export default function AuthInput({
  children,
  authentication = true,
  requiredRoles = ["user"],
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(showLoading());

    (async () => {
      if (authentication && !authStatus) {
        dispatch(logout());
        console.log("inside if");
        navigate("/login");
      } else if (!authentication && authStatus) {
        navigate("/dashboard");
      } else if (authentication && authStatus) {
        const hasPermission = requiredRoles.some((role) =>
          role === "admin"
            ? user?.isAdmin
            : role === "doctor"
            ? user?.isDoctor
            : !user?.isAdmin && !user?.isDoctor
        );

        if (!hasPermission) {
          navigate("/");
          message.error("You don't have permission to access those pages");
        }
      }

      // Hide loading spinner
      dispatch(hideLoading());
    })(); // Immediately invoke the async function
  }, [authStatus, authentication, user, navigate, dispatch]);

  return <>{children}</>;
}
