import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./auth.css";
import {useFormik} from "formik";
import * as Yup from "yup";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
const formSchema = Yup.object({
     email: Yup.string().email("ایمیل شما معتبر نیست").required("ایمیل شما الزامی است"),
     password: Yup.string().required("پسوورد شما الزامی است").min(6, "حداقل کارکتر 6 کارکتر است"),
})
const Login = () => {
     const {login, loginError} = useContext(AuthContext)

     const formik = useFormik({
          initialValues: {
              email: "",
              password: "", 
          },
          onSubmit: (values) => {
               login(values)
          },
          validationSchema: formSchema
     });



  return (
    <div className='container'>
         <Navbar />
         <div className="columns is-flex is-align-items-center auth">
              <div className="column is-two-fifths">
                   <form onSubmit={formik.handleSubmit} className='has-background-dark box p-6'>
                      <h1 className='has-text-white is-size-4 has-text-centered mb-6'>ورود به حساب کاربری</h1>  
                      <h1 className='has-text-danger is-size-5 has-text-centered mb-4'>{loginError}</h1>  

                      <div className="field">
                           <label className='label'>ایمیل</label>
                           <div className="control">
                                <input 
                                type="email"
                                 name="email"
                                  className="input"
                                  placeholder='ایمیل شما'
                                  value={formik.values.email}
                                  onChange={formik.handleChange("email")}
                                  onBlur={formik.handleBlur("email")}
                                  />
                           </div>
                           <p className='help is-danger'>
                                {formik.touched.email && formik.errors.email}
                           </p>
                      </div>
                      <div className="field">
                           <label className='label'>رمز عبور</label>
                           <div className="control">
                                <input 
                                type="text"
                                 name="password"
                                  className="input"
                                  placeholder='مثال * 123456'
                                  value={formik.values.password}
                                  onChange={formik.handleChange("password")}
                                  onBlur={formik.handleBlur("password")}
                                  />
                           </div>
                           <p className='help is-danger'>
                                {formik.touched.password && formik.errors.password}
                           </p>
                      </div>
                      <div className="field">
                        <button type='submit' className='button is-success is-fullwidth mt-5'>ورود</button>
                      </div>

                      <Link to="/generate-password-token" className='has-text-white mt-4 is-flex'>رمز عبورت رو فراموش کردی؟</Link>
                   </form>
              </div>
              <div className="column">
                   <h1 className='has-text-centered is-size-1 has-text-weight-bold has-text-light mb-6'>خوش اومدی به خونه</h1>
                   <h2 className='has-text-centered is-size-3 has-text-light'>یه بلاگ مهمونمون کن</h2>
              </div>
         </div>
    </div>
  )
}

export default Login