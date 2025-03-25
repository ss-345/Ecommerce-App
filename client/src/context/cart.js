import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useAuth();
  const updateCart = async (updatedCart) => {

    try {
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const result = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/cart-update`,
        { cart: updatedCart }
      );

      if (result.data.success) {

        const updatedAuth = {
          ...auth,
          user: {
            ...auth.user,
            cart: result.data.updatedCart, 
          },
        };

        setAuth(updatedAuth);
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
      }
    } catch (error) {
      console.error("Failed to update cart on backend", error);
    }
  };

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      let cartItems = JSON.parse(existingCartItem);

      setCart(cartItems);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
