import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <Layout title={"Go back-Page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h1 className="pnf-heading">Oops! page not found</h1>
        <Link to="/" className="pnf-btn">Go Back</Link>
      </div>
    </Layout>
  );
};

export default PagenotFound;
