import React from "react";
import { useContext } from "react";
import { PostContext } from "../../../context/PostContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AuthContext } from "../../../context/AuthContext";
import "./sidebar.css"
const SideBar = () => {
  const { popularPost, popularPosts } = useContext(PostContext);
  const { popularUser, popularUsers } = useContext(AuthContext);
  useEffect(() => {
    popularPost();
    popularUser();
  }, []);
  return (
    <aside className="menu">
      <div className="post-menu has-background-white box">
        <p className="menu-label is-size-5">پست های محبوب</p>
        <ul className="menu-list">
          {popularPosts?.map((post) => {
            return (
              <li key={post._id} className="mt-4">
                <div className="post-list is-flex is-align-items-center is-justify-content-space-between">
                  <div className="img-box is-flex is-align-items-center">
                    <img src={post.image} width="50" alt="" />
                    <p className="mr-3 is-flex is-align-items-center">
                      <AiOutlineEye className="ml-1" />
                      {post.numViews}
                    </p>
                    <h4 className="is-size-6 mr-2">{post.title}</h4>
                  </div>
                  <Link
                    to={`/detail-post/${post._id}`}
                    className="button mr-3 is-size-6"
                  >
                    مشاهده
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>


      <div className="post-menu has-background-white box">
        <p className="menu-label is-size-5">محبوب ترین کاربران</p>
        <ul className="menu-list">
          {popularUsers?.map((user) => {
            return (
              <li key={user._id} className="mt-4">
                <div className="post-list is-flex is-align-items-center is-justify-content-space-between">
                  <div className="img-box is-flex is-align-items-center">
                    <img src={user.profilePhoto} width="50" alt="" />
                  
                    <h4 className="is-size-6 mr-2">{user.firstName} {user.lastName}</h4>
                  </div>
                  <Link
                    to={`/profile/${user._id}`}
                    className="button mr-3 is-size-6"
                  >
                    مشاهده
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
