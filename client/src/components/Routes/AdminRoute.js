import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../spinner";
import axios from "axios";
const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const autoCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during user-auth check:", error);
        setOk(false);
      }
    };
    if (auth?.token) {
      autoCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default AdminRoute;
