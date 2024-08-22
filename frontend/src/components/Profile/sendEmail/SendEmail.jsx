import React from "react";
import Navbar from "../../navbar/Navbar";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const formSchema = Yup.object({
  subject: Yup.string().required("وارد کردن موضوع الزامی است"),
  description: Yup.string().required("وارد کردن متن الزامی است"),
});

const SendEmail = () => {
  const {sendEmail} = useContext(AuthContext)
  const { state } = useLocation();

  const formik = useFormik({
    initialValues: {
      email: state,
      subject: "",
      description: "",
    },
    onSubmit: (values) => {
      const data = {
        email: values.email,
        subject: values.subject,
        description: values.description,
      };
      sendEmail(data);
    },
    validationSchema: formSchema,
  });

  return (
    <div className="container">
      <Navbar />
      <h1 className="is-size-1 mt-6 pt-6 has-text-centered has-text-white">
        ارسال ایمیل
      </h1>
      <div className="columns mt-6 pt-6 is-justify-content-center">
        <div className="column is-half">
          <form onSubmit={formik.handleSubmit}>
            <div className="field mt-5">
              <label className="label">ایمیل گیرنده</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="ایمیل کاربر گیرنده"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  disabled
                />
              </div>
            </div>
            <div className="field mt-5">
              <label className="label">موضوع</label>
              <div className="control">
                <input type="text" className="input" placeholder="موضوع"
                    value={formik.values.subject}
                    onChange={formik.handleChange("subject")}
                    onBlur={formik.handleBlur("subject")}
                />
                <p className="help is-danger">
                     {formik.touched.subject && formik.errors.subject}
                </p>
              </div>
            </div>
            <div className="field mt-5">
              <label className="label">پیغام شما</label>
              <div className="control">
                <textarea
                  type="text"
                  className="textarea"
                  placeholder="پیغام شما"
                  value={formik.values.description}
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
                  ارسال پیام
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
