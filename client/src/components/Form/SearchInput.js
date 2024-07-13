import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      // setValues({ ...values, keyword: "" });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
