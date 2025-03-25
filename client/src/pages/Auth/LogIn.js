import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import { useAuth } from "../../context/auth";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      // {
      //   console.log(result);
      // }
      if (result && result.data.success) {
        toast.success(result.data.message);
        setAuth({ ...auth, user: result.data.user, token: result.data.token });
        localStorage.setItem("auth", JSON.stringify(result.data));
        navigate(location.state || "/");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Layout title={"Login-Page"}>
      <div className="form-container" style={{ minHeight: "80vh" }}>
        <form onSubmit={handleOnSubmit}>
          <h4 className="title">LOGIN</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary forgot-btn"
              onClick={() => navigate("/forgot-password")}
            >
              FORGOT PASSWORD
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LogIn;
