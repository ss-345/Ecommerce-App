import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params?.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);
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
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
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
                <button
                  className="btn btn-primary "
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
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
    </Layout>
  );
};

export default CategoryProduct;
