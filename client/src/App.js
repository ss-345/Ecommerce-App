import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import PagenotFound from "./pages/PagenotFound";
import "./App.css";
import Register from "./pages/Auth/Register";
import LogIn from "./pages/Auth/LogIn";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";

import Users from "./pages/Admin/Users.js";
import Profile from "./pages/user/Profile.js";
import Orders from "./pages/user/Orders.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search.js";
import ProductDetails from "./pages/ProductDetails.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";
import AdminOrders from "./pages/Admin/AdminOrders.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<Products />} />
        </Route>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
