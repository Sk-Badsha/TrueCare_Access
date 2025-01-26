import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await axios.get("/api/v1/users/refreshAccessToken", {
        withCredentials: true,
      });
      const { user, accessToken } = response.data.data;
      console.log(user);
      dispatch(login(user));
      return accessToken;
    } catch (error) {
      console.error("Failed to refresh token", error);
      dispatch(logout());
      throw error;
    }
  };
  return refresh;
};

export default useRefreshToken;
