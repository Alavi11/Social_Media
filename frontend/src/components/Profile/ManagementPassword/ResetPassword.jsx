import React from 'react'
import Navbar from '../../navbar/Navbar'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
const formShema = Yup.object({
     email: Yup.string().email("یک ایمیل معتبر وارد کنید").required("ایمیل شما الزامی است")
})
const ResetPassword = () => {
     const {resetPasswordToken, errorForgetPassword} = useContext(AuthContext)
     const formik = useFormik({
          initialValues: {
               email: "",
          },
          onSubmit: (values) => {
               resetPasswordToken(values);
          },
          validationSchema: formShema
     })

  return (
    <div className="container">
         <Navbar />
         <div className="columns is-flex is-justify-content-center">
              <div className="column is-two-fifths">
                   <h1 
                   className='has-text-white is-size-1 has-text-centered mb-6 mt-6 pt-6'>
                        فرم فراموشی رمز عبور
                   </h1>
                   <form onSubmit={formik.handleSubmit} className='p-6 has-background-dark box'>
                        <h1 className='has-text-white is-size-4 has-text-centered mb-6'>
                             ایمیل خود را وارد کنید
                        </h1>

                         <h1 className='has-text-danger is-size-5 has-text-centered mb-2'>
                             {errorForgetPassword}
                        </h1>
                        <div className="field">
                             <label className="label">ایمیل شما</label>
                             <div className="control">
                             <input 
                             type="text"
                              className='input'
                               placeholder='ایمیل شما'
                               value={formik.values.email}
                               onChange={formik.handleChange("email")}
                               onBlur={formik.handleBlur("email")}
                               />
                               <p className='help is-danger'>
                                    {formik.touched.email && formik.errors.email}
                               </p>
                             </div>
                        </div>

                        <div className="field">
                             <button 
                             className='button is-success is-fullwidth mt-5'
                              type='submit'>ارسال لینک فعالسازی</button>
                        </div>
                   </form>
              </div>
         </div>
    </div>
  )
}

export default ResetPassword