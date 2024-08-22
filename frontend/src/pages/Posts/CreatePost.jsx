import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useEffect } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { PostContext } from "../../context/PostContext";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./post.css"

const formSchema = Yup.object({
  title: Yup.string().required("عنوان پست الزامی است"),
  description: Yup.string().required("متن پست الزامی است"),
  category: Yup.string().required("دسته پست الزامی است"),
})
const CreatePost = () => {
  const {category, getCategory} = useContext(CategoryContext);
  const {createPost, postError} = useContext(PostContext)
 
  useEffect(()=> {
    getCategory()
  },[])

  const [preview, setPreview] = useState("")
  const [file , setFile] = useState([]);
  const loadImage = (e)=>{
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image));
  }

  const formik = useFormik({
    initialValues: {
        title: "",
        description: "",
        category: "",
        image: "",
    },
    onSubmit: (values) => {
      const data ={
        title: values.title,
        category: values.category,
        description: values.description,
        image: file
      }
      createPost(data)
    },
    validationSchema: formSchema
});



  return (
    <div className="container">
      <Navbar />
      <div className="columns mt-6 pt-6">
        <div className="column">
          <h1 className="has-text-centered has-text-danger is-size-4 pt-5 pb-5">
            {postError}
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="post-editor is-flex">
              <div className="post-editor-right pl-5">
                <div className="field mt-5">
                  <label className="label">عنوان پست</label>
                  <div className="control">
                    <input type="text"
                     placeholder="عنوان پست شما"
                      className="input"
                      value={formik.values.title}
                      onChange={formik.handleChange("title")}
                      onBlur={formik.handleBlur("title")}
                      />
                      <p className="help is-danger">
                        {formik.touched.title && formik.errors.title}
                      </p>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">عنوان پست</label>
                  <div className="control">
                  <ReactQuill
                  theme="snow"
                  className="has-background-white"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  />

                    {/* <textarea
                      className="textarea"
                      placeholder="متن شما"
                      value={formik.values.description}
                      onChange={formik.handleChange("description")}
                      onBlur={formik.handleBlur("description")}
                      >
                    </textarea> */}
                    <p className="help is-danger">
                        {formik.touched.description && formik.errors.description}
                      </p>

                  </div>
                </div>
              </div>
              <div className="post-editor-left">
                   <div className="field mt-5">
                        <label className="label">دسته بندی پست</label>
                       <div className="select is-fullwidth">
                       <select name=""
                         value={formik.values.category}
                         onChange={formik.handleChange("category")}
                         onBlur={formik.handleBlur("category")}
                         >
                             <option>انتخاب کنید</option>
                             {
                               category?.map((cat) => (
                                <option key={cat._id} value={cat.title}>{cat.title}</option>
                               ))
                             }
                        </select>
                        <p className="help is-danger">
                        {formik.touched.category && formik.errors.category}
                      </p>
                       </div>
                   </div>
                   <div className="field mt-5">
                        <label className="label">عکس پست</label>
                        <div className="control">
                        <input type="file" className="input"
                        value={formik.values.image}
                          onChange={loadImage}
                          onBlur={formik.handleBlur("image")}
                        />
                        {
                          preview ? (
                            <figure className="image-preview mt-3">
                              <img src={preview} width="250"  alt="" />
                            </figure>
                          ) : ""
                        }
                        </div>
                   </div>

                   <div className="field mt-5">
                         <div className="control">
                              <button type="submit" className="button is-link">ارسال پست</button>
                         </div>
                   </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
