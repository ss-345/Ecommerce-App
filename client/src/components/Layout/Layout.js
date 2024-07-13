import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, description, keywords, author, title }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
};
Layout.defaultProps = {
  title: "Ecommerce App",
  description: "Mern stack project",
  keywords: "react,mongodb",
  author: "Sujal",
};

export default Layout;
