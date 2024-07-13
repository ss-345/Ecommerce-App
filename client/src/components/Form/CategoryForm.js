import React from "react";

const CategoryForm = ({handleOnSubmit,value,setValue}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add new category here"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default CategoryForm;
