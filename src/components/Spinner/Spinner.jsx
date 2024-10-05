import React from "react";
import ClockLoader from "react-spinners/ClockLoader";
import "../../styles/SpinnerStyles.css";

function Spinner() {
  return (
    <div className="spinner-container spinner-overlay">
      <ClockLoader color={"#36D7B7"} size={150} />
    </div>
  );
}

export default Spinner;
