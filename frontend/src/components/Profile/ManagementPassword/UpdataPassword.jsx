import React from 'react'
import Navbar from '../../navbar/Navbar'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
const formSchema = Yup.object({
     password: Yup.string().min(6, "حداقل کارکتر 6 میباشد").max(20, "حداکثر کارکتر 20 میباشد").required("وارد کردن پسوورد الزامی است"),
})
const UpdataPassword = () => {
     const {updataPassword} = useContext(AuthContext)

     const formik = useFormik({
          initialValues: {
               password: "",
          },
          onSubmit: (values) => {
               updataPassword(values)
          },
          validationSchema: formSchema
     });


  return (
    <div className="container">
         <Navbar />
         <div className="columns is-flex is-align-items-center is-justify-content-center mt-6 pt-6">
              <div className="column is-two-fifths mt-6 pt-6">
                   <form onSubmit={formik.handleSubmit}>
                        <h1 className='has-text-white is-size-4 has-text-centered mb-6'>
                             پسوورد جدید</h1>
                             <div className="field">
                                  <label className="label">پسوورد</label>
                                  <div className="control">
                                  <input type="text"
                                   className="input"
                                    placeholder='پسوورد شما' 
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    />
                             </div>
                             <p className='help is-danger'>
                                  {formik.touched.password && formik.errors.password}
                             </p>
                        </div>
                             <div className="field mt-5">
                                  <div className="control">
                                       <button type='submit' className='button is-link is-fullwidth'>ذخیره</button>
                                  </div>
                             </div>
                   </form>
              </div>
         </div>
    </div>
  )
}

export default UpdataPassword