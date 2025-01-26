import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import "../../styles/verifyAccount.css";

function VerifyAccount() {
  const length = 6;
  const location = useLocation();
  const email = location?.state?.email;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Allow only one character
    setOtp(newOtp);

    // Move to the next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // Optional: Focus on the first empty input field if clicked
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        // Move focus to the previous input field if current is empty
        inputRefs.current[index - 1].focus();
      }
      newOtp[index] = ""; // Clear current field
      setOtp(newOtp);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("");
      return;
    }
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleVerifyOTP = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/users/verifyAccount", {
        email,
        otp: otp.join(""), // Combine OTP into a single string
      });

      if (res.status === 200) {
        dispatch(hideLoading());
        message.success("Account verified successfully!");
        navigate("/login");
      } else {
        dispatch(hideLoading());
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior

    const pastedData = e.clipboardData.getData("text").slice(0, length); // Get pasted text and limit to OTP length
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (isNaN(pastedData[i])) continue; // Ignore non-numeric characters
      if (i < length) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Move focus to the appropriate input field
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
      inputRefs.current[nextEmptyIndex].focus();
    } else if (inputRefs.current[length - 1]) {
      inputRefs.current[length - 1].focus(); // Focus the last field if all are filled
    }
  };

  return (
    email && (
      <div className="form-container otp-form">
        <p>
          our one time password has been sent to your registered email{" "}
          {email.substring(0, 3) +
            "*".repeat(len - 7) +
            email.substring(len - 4)}
        </p>
        <h3 className="text-center">Verify OTP</h3>
        <form className="form-main otp-main-form">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {otp.map((val, ind) => (
              <input
                key={ind}
                type="text"
                className="otp-input"
                ref={(input) => (inputRefs.current[ind] = input)}
                value={val}
                onChange={(e) => handleChange(ind, e)}
                onClick={() => handleClick(ind)}
                onKeyDown={(e) => handleKeyDown(ind, e)}
                onPaste={handlePaste}
                required
              />
            ))}
          </div>
        </form>
        <button className="btn btn-primary btn-full" onClick={handleVerifyOTP}>
          Verify
        </button>
      </div>
    )
  );
}

export default VerifyAccount;
