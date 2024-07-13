import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Spinner = () => {
  const [count, setCount] = useState(6);
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preVal) => --preVal);
    }, 1000);
    count === 0 &&
      navigate(`${auth?.user !== null ? "/" : "/login"}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2 className="text-center">Redirecting to you in {count} seconds</h2>
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
