import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { cart, setCart, updateCart } = useCart();
  const navigate = useNavigate();
  // get-product-by-slug
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // get-similar-product

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  // initial-product-detail
  useEffect(() => {
    if (params?.slug) getProduct();
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
      const newCart=[...cart, productWithCount];
      setCart(newCart);
      updateCart(newCart);
      // localStorage.setItem("cart", JSON.stringify([...cart, productWithCount]));
      toast.success("Item added to cart");
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"400px"}
            width={"20px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          <h6>Price:${product.price}</h6>
          <h6>Category:{product.category?.name}</h6>
          <button className="btn btn-secondary">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h2 className="text-center">Similar Products</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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

export default ProductDetails;
