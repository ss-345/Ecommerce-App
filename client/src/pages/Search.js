import Layout from "../components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  // Check if product is already in cart
  const isProductInCart = (productId) => {
    return cart.some((product) => product._id === productId);
  };

  // Add to cart handler
  const addToCart = (product) => {
    if (isProductInCart(product._id)) {
      toast.error("Product is already in the cart");
    } else {
      const productWithCount = { ...product, count: 1 };
      setCart([...cart, productWithCount]);
      localStorage.setItem("cart", JSON.stringify([...cart, productWithCount]));
      toast.success("Item added to cart");
    }
  };
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Result Found"
              : `Found : ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "20rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">${p.price}</p>
                  <button className="btn btn-primary ">More Details</button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(p)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
