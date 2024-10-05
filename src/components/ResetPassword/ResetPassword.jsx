import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const ResetPassword = () => {
  const { id, token } = useParams(); // Extract id and token from the URL
  const [validToken, setValidToken] = useState(false); // Token validity state
  const [password, setPassword] = useState(""); // State to hold new password
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Verify the token when the component loads
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `/api/v1/users/reset-password/${id}/${token}`
        );
        if (res.data.success) {
          setValidToken(true); // If the token is valid, allow the form to be shown
        }
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    verifyToken();
  }, [id, token]);

  // Function to handle password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/users/reset-password/${id}/${token}`,
        {
          password,
        }
      );
      message.success(res.data.message);
      navigate("/login"); // Redirect to login after successful password reset
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div>
      {validToken ? (
        <form onSubmit={handleSubmit}>
          <label>Enter New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        <p>{error}</p> // Display error if token is invalid or expired
      )}
    </div>
  );
};

export default ResetPassword;
