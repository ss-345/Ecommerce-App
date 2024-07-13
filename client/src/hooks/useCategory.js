import axios from "axios";
import React, { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  // get-categories

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.allCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;
