import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // create-category

  const handleOnSubmitNewCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${data.category.name}
           category is created`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during creation of cateegory");
    }
  };
  // get-all
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.allCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };
  // update category

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // delete category

  const handleDelete = async (id, deletedName) => {
    // e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success(`${deletedName} is deleted`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <div>
      <Layout title={"Admin-create-category"}>
        <div className="container-fluid m-3 p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9 mt-4">
              <div className="card w-75 p-3">
                <h1>Createcategory</h1>
                <div>
                  <CategoryForm
                    handleOnSubmit={handleOnSubmitNewCategory}
                    value={name}
                    setValue={setName}
                  />
                </div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((c) => (
                        <>
                          <tr>
                            <td key={c._id}>{c.name}</td>
                            <td>
                              <button
                                className="btn btn-primary ms-2"
                                onClick={() => {
                                  setOpen(true);
                                  setUpdatedName(c.name);
                                  setSelected(c);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger ms-2"
                                onClick={() => {
                                  handleDelete(c._id, c.name);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Modal
                  onCancel={() => setOpen(false)}
                  footer={null}
                  open={open}
                >
                  <CategoryForm
                    value={updatedName}
                    setValue={setUpdatedName}
                    handleOnSubmit={handleUpdate}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateCategory;
