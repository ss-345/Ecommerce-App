import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart, updateCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // get-total-count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  // get-all-products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      // toast.success(data?.message);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // get-all-categories

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.allCategory);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // filter by category

  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Check if product is already in cart
  const isProductInCart = (productId) => {
    return cart.some((product) => product._id === productId);
  };

  // Add to cart handler
  const addToCart = async (product) => {
    if (isProductInCart(product._id)) {
      toast.error("Product is already in the cart");
    } else {
      const productWithCount = { ...product, count: 1 };
      const updatedCart = [...cart, productWithCount];
      await setCart(updatedCart); 
      localStorage.setItem("cart", JSON.stringify(updatedCart)); 
      
      updateCart(updatedCart); 
      toast.success("Item added to cart");
    }
  };
  return (
    <Layout title={"Best Offer - Shop Now"}>
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="row mt-4">
        <div className="col-md-3 col-sm-4 col-12 mb-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column p-3 gap-2 border rounded bg-light">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column p-3 gap-3 border rounded bg-light">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="mt-4 text-center">
            <button
              className="btn btn-danger w-100"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">
            {products.length === 0 ? "No Products Available" : "All Products"}
          </h1>

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
                  <p className="card-text">${p.price} </p>
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
          <div className="m-2 p-3">
            {products.length !== 0 && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {/* {console.log(products)} */}
                {loading ? "Loading......" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
