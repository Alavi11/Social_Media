import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const formSchema = Yup.object({
  firstName: Yup.string().required("نام  الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  bio: Yup.string().required("درباره خودت یه چیزی بنویس"),
});
const UpdateProfile = () => {
     const {state} = useLocation()
     const {ProfileUpdate} = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
     firstName: state.firstName,
     lastName: state.lastName,
     bio: state.bio,
    },
    onSubmit: (values) => {
     ProfileUpdate(values);
    },
    validationSchema: formSchema,
  });

  return (
    <div className="container">
      <Navbar />

      <div className="columns is-justify-content-center">
        <div className="column is-half">
          <form onSubmit={formik.handleSubmit} className="mt-6">
            <div className="field">
              <label className="label">نام شما</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="نام شما"
                  defaultValue={state.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
              </div>
              <p className="help is-danger">
                {formik.touched.firstName && formik.errors.firstName}
              </p>
            </div>
            <div className="field">
              <label className="label">فامیلی شما</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="نام شما"
                  defaultValue={state.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
              </div>
              <p className="help is-danger">
                {formik.touched.lastName && formik.errors.lastName}
              </p>
            </div>
            <div className="field">
              <label className="label">درباره شما</label>
              <div className="control">
                <textarea
                  type="text"
                  className="textarea"
                  placeholder="نام شما"
                  defaultValue={state.bio}
                  onChange={formik.handleChange("bio")}
                  onBlur={formik.handleBlur("bio")}
                ></textarea>
              </div>
              <p className="help is-danger">
                {formik.touched.bio && formik.errors.bio}
              </p>
            </div>

            <div className="field mt-6">
              <div className="control">
                <button
                  type="submit"
                  className="button is-link has-text-weight-bold is-fullwidth"
                >
                 ویرایش حساب کاربری
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
