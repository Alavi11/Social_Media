import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";

const formSchema = Yup.object({
  title: Yup.string().required("عنوان پست الزامی است"),
  description: Yup.string().required("متن پست الزامی است"),
  category: Yup.string().required("دسته پست الزامی است"),
});
const EditPost = () => {
  const { category, getCategory } = useContext(CategoryContext);
  const {userId} = useContext(AuthContext)
const {updatePost} = useContext(PostContext)

  const { state } = useLocation();
  useEffect(() => {
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: state.title,
      description: state.description,
      category: state.category,
      id: state._id,
      user: userId
    },
    onSubmit: (values) => {
     updatePost(values);
    },
    validationSchema: formSchema,
  });

  return (
    <div className="container">
      <Navbar />
      <h1 className="has-text-white mt-6 pt-6 is-size-2 has-text-centered">
        ویرایش پست
      </h1>
      <div className="columns is-justify-content-center mt-6 pt-6">
        <div className="column is-half">
          <form onSubmit={formik.handleSubmit}>
            <div className="field mt-5">
              <label className="label">عنوان پست</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="عنوان پست شما"
                  defaultValue={state.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                />
                <p className="help is-danger">
                  {formik.touched.title && formik.errors.title}
                </p>
              </div>
            </div>
            <div className="field mt-5">
              <label className="label">دسته بندی پست</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="category"
                    defaultValue={state.category}
                    onChange={formik.handleChange("category")}
                    onBlur={formik.handleBlur("category")}
                  >
                    {category &&
                      category.map((cat) => (
                        <option value={cat.title} key={cat._id}>
                          {cat.title}
                        </option>
                      ))}
                  </select>
                  <p className="help is-danger">
                    {formik.touched.category && formik.errors.category}
                  </p>
                </div>
              </div>
            </div>
            <div className="field mt-5">
              <label className="label">متن پست</label>
              <div className="control">
                <textarea
                  name=""
                  placeholder="متن پست شما"
                  className="textarea"
                  defaultValue={state.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                ></textarea>
                <p className="help is-danger">
                  {formik.touched.description && formik.errors.description}
                </p>
              </div>
            </div>
            <div className="field mt-5">
              <div className="control">
                <button type="submit" className="button is-link">
                  ویرایش پست
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
