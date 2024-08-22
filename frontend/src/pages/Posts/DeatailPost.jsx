import React, { useContext } from 'react'
import Navbar from "../../components/navbar/Navbar"
import { Link, useParams } from 'react-router-dom'
import { PostContext } from '../../context/PostContext'
import { useEffect } from 'react'
import { BsChevronLeft } from "react-icons/bs";
import { RiDeleteBinLine, RiImageEditFill } from "react-icons/ri";
import moment from 'jalali-moment'
import ShowComment from '../../components/Posts/postDetail/ShowComment'
import AddComment from '../../components/Posts/postDetail/AddComment'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import DOMPurify from 'dompurify'
const DeatailPost = () => {
  const {detailPost, singlePost, deletePost} = useContext(PostContext)
  const {userId} = useContext(AuthContext)
  const [addComment,setAddComment] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const {id} = useParams();
  const checkUser = singlePost?.user?._id === userId
  useEffect(()=> {
    detailPost(id)
  }, [])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
   <div className="container">
     <Navbar />
    <div className="bread-crump mt-2 has-text-white pr-6 pt-6 is-flex- is-align-items-center">
      شبکه اجتماعی تاپ لرن <BsChevronLeft className='mr-3 ml-3'  /> پست ها 
      <BsChevronLeft  className='mr-3 ml-3' /> {singlePost.category}
    </div>

    <div className="single-post">
      <div className="single-post-title  mt-6 is-flex is-justify-content-space-between is-align-items-center">
        <h1 className='is-size-2 has-text-white single-title'>{singlePost.title}</h1>
        <strong className='has-text-white'>
          {moment(singlePost.createdAt).locale("fa").format("YYYY-MM-DD")}
        </strong>
      </div>
    </div>


    <div className="columns mt-6">
      <div className="column is-three-fifths">
      <div className="content mb-6">
            <div className='is-flex is-justify-content-space-between mb-5'>
              <strong>
                <div className="post-detail-user">
                  <div className="author is-flex is-align-items-center">
                    <div className="image is-64x64">
                      <img src={singlePost?.user?.profilePhoto} alt="" />
                    </div>
                    <div >
                      <h3 className='has-text-white mr-3 mb-0'>{singlePost?.user?.firstName}</h3>
                    </div>
                  </div>
                </div>
              </strong>
              <div className="edit-post mt-3 mb-3">
                {
                  checkUser ? (
                      <>
                            <Link to={`/edit-post/${singlePost._id}`} state={singlePost} className='is-size-3 has-text-success pl-3' ><RiImageEditFill /></Link>
                <span onClick={()=> deletePost(singlePost._id)} className='is-size-3 has-text-danger is-clickable'><RiDeleteBinLine /></span>
                      </>
                  ) :
                  ""
                }

          
              </div>

            </div>
            <div className="single-desc">
          <p className='is-size-5 has-text-white'
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(singlePost.description)
           }}
          ></p>
        </div>
          </div>
     
      </div>
      <div className="column">
        <img src={singlePost.image} alt="" />
      </div>
    </div>

    <div className="button-comment mt-6 mb-6">
      <button className='button is-success is-medium' onClick={()=> setAddComment(!addComment)}>افزودن نظر</button>
      <button className='button is-info is-medium mr-4' onClick={()=> setShowComment(!showComment)}>نمایش نظر </button>
    </div>

    {addComment ? <AddComment /> : ""}

    {showComment ? <ShowComment comment={singlePost.comments} /> : ""}


   </div>
  )
}

export default DeatailPost