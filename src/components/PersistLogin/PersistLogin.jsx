import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../customHook/useRefreshToken";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const location = useLocation();
  const from = location?.pathname;

  const authStatus = useSelector((state) => state.auth.status);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("Error during token refresh:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Refresh token if user is not authenticated
    if (!authStatus && from != "/login" && accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [authStatus, refresh]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
