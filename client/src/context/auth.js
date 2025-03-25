import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import { useCart } from "./cart";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  // const [cart, setCart] = useCart();
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      // setAuth({ ...auth, user: parseData.user, token: parseData.token });
      setAuth({ user: parseData.user, token: parseData.token });
      // setCart(auth.user?.cart);
      console.log(parseData);
      if (parseData.user && parseData.user.cart) {
        {
          console.log("hi");
        }
        localStorage.setItem("cart", JSON.stringify(parseData.user.cart));
      } else {
        {
          console.log("hello");
        }
        localStorage.setItem("cart", JSON.stringify([])); // Set empty array if cart is not available
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
