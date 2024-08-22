import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../../../context/PostContext'
import { useEffect } from 'react'
import moment from "jalali-moment";
import { AiOutlineEye,AiFillLike,AiTwotoneDislike } from "react-icons/ai";
import { Link } from 'react-router-dom';
const PostLists = () => {
  const {getPosts,posts, likePost, disLikePost} = useContext(PostContext)
  useEffect(()=> {
    getPosts()
  }, [])



  return (
   <>
    {posts && posts.map((post)=> (
       <div className="box" key={post._id}>
       <article className="media">
         <div className="media-right">
           <figure className="image is-64x64">
             <Link to={`/profile/${post?.user?._id}`}>
             <img src={post?.user?.profilePhoto} className="img-profile" alt="Image" />
             </Link>
           </figure>
         </div>
         <div className="media-content">
           <div className="content">
              <div className='is-flex is-justify-content-space-between mb-5'>
              <strong>{post.user.firstName}</strong>
              <strong>{moment(post.createdAt).locale("fa").format("YYYY/M/D")}</strong>

              </div>
              <Link to={`/detail-post/${post._id}`}>
              <figure className='image is-128x128'>
                <img src={post?.image} alt="" />
              </figure>

              <p>{post.title}</p>
              </Link>
           </div>
           <nav className="level is-mobile is-align-items-center">
             <div className="level-left">
                <a className='level-item'>
                  <span className='is-small is-flex is-align-content-center'>
                    <AiOutlineEye className='is-size-4 has-text-dark' />
                    <span className='has-text-dark is-size-6 mr-1'>
                      {post.numViews ? post.numViews : "بدون بازدید"}
                    </span>
                  </span>
                </a>
             </div>
             <div className="level-right">
                <a className='level-item'>
                  <span className='is-small'>
                      <AiTwotoneDislike onClick={()=> disLikePost(post._id)} className='is-size-4 has-text-danger' />
                      <span className='has-text-danger is-size-4'>
                          {
                            post.disLikes.length
                          }
                      </span>
                  </span>
                </a>
                <a className='level-item mr-2'>
                  <span className='is-small'>
                      <AiFillLike onClick={()=> likePost(post._id)} className='is-size-4' />
                      <span className=' is-size-4'>
                          {
                            post.likes.length
                          }
                      </span>
                  </span>
                </a>
              </div>
           </nav>
         </div>
       </article>
     </div>
    ))}
   </>
  )
}

export default PostLists