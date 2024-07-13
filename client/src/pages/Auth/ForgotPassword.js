import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  
  const navigate = useNavigate();
  

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email,answer,newPassword }
      );
      if (result && result.data.success) {
        toast.success(result.data.message);
        
        navigate("/login");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log("Forgot password change Error:", error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Layout title={"Forgot-Password-Page"}>
      <div className="form-container" style={{ minHeight: "80vh" }}>
        <form onSubmit={handleOnSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="What is Your Favorite sports"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              RESET
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
