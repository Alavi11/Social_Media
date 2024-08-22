import React from 'react'
import {useFormik} from "formik";
import * as Yup from "yup";
import "./comment.css"
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CommentContext } from '../../../context/CommentContext';

const formSchema = Yup.object({
     description: Yup.string().required("متن نظر الزامی است")
})


const AddComment = () => {
     const {createComment,errorComment} = useContext(CommentContext)

     const {id} = useParams()

     const formik = useFormik({
          initialValues: {
               description: ""
          },
          onSubmit: (values) => {
               const data = {
                    postId: id,
                    description: values.description
               }
               createComment(data);
          },
          validationSchema: formSchema
     })

  return (
       <form onSubmit={formik.handleSubmit}>
            <h1 className='has-text-centered is-size-4 has-text-danger pt-5 pb-5'>{errorComment}</h1>
            <div className="field">
                 <label className='label'>نظر شما</label>
                 <div className="control">
                      <textarea name='description'
                       placeholder='نظر خودتو بنویس'
                        className='textarea textarea-comment'
                        value={formik.values.description}
                        onChange={formik.handleChange("description")}
                        onBlur = {formik.handleBlur("description")}
                        ></textarea>
                            <p className='help is-size-6 mb-4 is-danger'>
                                  {formik.touched.description && formik.errors.description}
                             </p>
                 </div>
            </div>
            <div className="field">
                 <div className="control">
                      <button type='submit' className='button is-link'>ارسال</button>
                 </div>
            </div>
       </form>
  )
}

export default AddComment