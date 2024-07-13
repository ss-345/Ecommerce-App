import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      let cartItems = JSON.parse(existingCartItem);

      setCart(cartItems);
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
