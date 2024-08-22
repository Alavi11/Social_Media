import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { BsFillTrash2Fill, BsFillChatSquareDotsFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { CommentContext } from "../../../context/CommentContext";
import { AuthContext } from "../../../context/AuthContext";
import "./comment.css"
const ShowComment = (props) => {
  const { comment } = props;
  const { updateComment, deleteComment } = useContext(CommentContext);
  const { userId } = useContext(AuthContext);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [editComment, setEditComment] = useState({
    description: "",
  });

  const handleChange = (e) => {
    setEditComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await updateComment(editComment);
    setShow(false);
  };

  if (comment?.length === 0) {
    return <div className="box mt-6">نظری وجود ندارد.</div>;
  }

  return (
    <div className="comment-list mt-6 pb-6">
      {comment &&
        comment.map((com) => {
          return (
            <div className="box" key={com._id}>
              <div className="comment is-flex is-justify-content-space-between">
               <div className="author">
                 <div className="comment-author is-flex is-align-items-center">
                   <div className="comment-img">
                     <img src={com?.user?.profilePhoto} alt="" />
                   </div>
                   <div className="comment-name pr-4">
                     <h1>{com?.user?.firstName} {com?.user?.lastName}</h1>
                   </div>
                 </div>
               <div className="comment-desc pr-6 pt-5">{com.description}</div>
               </div>
                <div className="is-flex">
                  {com?.user?._id === userId ? (
                    <>
                      <span className="is-size-5 ml-3 has-text-danger is-clickable">
                        <BsFillTrash2Fill
                          onClick={() =>
                            deleteComment({
                              commentId: com._id,
                              postId: id,
                            })
                          }
                        />
                      </span>
                      <span
                        onClick={() => setShow(!show)}
                        className="is-size-5 has-text-success is-clickable"
                      >
                        <BsFillChatSquareDotsFill
                          onClick={() =>
                            setEditComment({
                              commentId: com._id,
                              postId: id,
                            })
                          }
                        />
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {show ? (
        <div className="comment-edit">
          <form onSubmit={handleClick}>
            <input
              type="text"
              className="input pt-5 pb-5"
              placeholder="نظرتون"
              name="description"
              onChange={handleChange}
            />
            <button type="submit" className="button is-success mt-4">
              ویرایش نظر
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShowComment;
