import React from "react";
import "./styles/Purchased.css";

function Purchased({ change_bool }) {
  return (
    <div className="purchased">
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
        <br />
      </svg>

      <div className="text-center">
        <h1>Thanks for Shoping with us</h1>
        <a href="/" className="btn btn-primary">
          Go To Home
        </a>
      </div>
    </div>
  );
}

export default Purchased;
