import React from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik'
import Navbar from '../../navbar/Navbar'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useParams } from 'react-router-dom'
const formShema = Yup.object({
     password: Yup.string().required("رمز عبور شما الزامی است")
})
const NewPassword = () => {
     const {newPassword} = useContext(AuthContext)

     const {id} = useParams()

     const formik = useFormik({
          initialValues: {
               password: "",
          },
          onSubmit: (values) => {
               const data= {
                    password: values.password,
                    token: id,
               }
               newPassword(data);
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
                         رمز خود را وارد کنید
                    </h1>

                    <div className="field">
                         <label className="label">رمز شما</label>
                         <div className="control">
                         <input 
                         type="text"
                          className='input'
                           placeholder='رمز عبور شما'
                           value={formik.values.password}
                           onChange={formik.handleChange("password")}
                           onBlur={formik.handleBlur("password")}
                           />
                           <p className='help is-danger'>
                                {formik.touched.password && formik.errors.password}
                           </p>
                         </div>
                    </div>

                    <div className="field">
                         <button 
                         className='button is-success is-fullwidth mt-5'
                          type='submit'>تغییر رمز عبور</button>
                    </div>
               </form>
          </div>
     </div>
</div>
  )
}

export default NewPassword