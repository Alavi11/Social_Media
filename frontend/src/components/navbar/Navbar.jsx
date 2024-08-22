import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineUpload } from "react-icons/ai";
import "./navbar.css"
import { useState } from "react";
const Navbar = () => {
  const {userId,profilePhoto,logout,isAdmin} = useContext(AuthContext)
  const [show, setShow] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-end">

      {
        userId ? 
          <>
          <span onClick={()=> setShow(!show)} className="is-flex is-align-items-center ml-3">
            <img src={profilePhoto} className="img-profile" width="40" alt="" />
          {
            show ?
            <div className="profile">
            <Link to="/profile" className="is-flex is-align-items-center">پروفایل</Link>
            <Link to="/update-password" className="is-flex is-align-items-center">ویرایش پسوورد</Link>
            <button onClick={logout} className="is-flex is-align-items-center">خروج</button>
          </div>
            :
            ""
          }
          </span>
            <Link to="/" className="navbar-item">خانه</Link>
            {
              isAdmin ?
              <>
                <Link to="/add-category" className="navbar-item">ساخت دسته بندی</Link>
            <Link to="/users" className="navbar-item">کاربران</Link>
              </>
              :
              ""
            }
          
          </>
        :
      <>
        <Link to="/login" className="navbar-item">
        ورود
      </Link>

      <Link to="/register" className="navbar-item">
        ثبت نام
      </Link>
      </>
      }

     
      </div>
      <div className="navbar-brand">
        {userId && 
          <Link to="/create-post" className="button is-danger mt-4">ارسال پست
          <AiOutlineUpload className="is-size-3 mr-2" />
          </Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
