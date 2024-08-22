import asyncHandler from "express-async-handler"
import Comment from "../../models/comment/Comment.js";
import {validateMongodbId} from "../../utils/vakidateMongoDbId.js"
import User from "../../models/user/User.js"
import {blockUser} from "../../utils/blockUser.js"
import { verifyUser } from "../../utils/verifyUser.js";

export const getComment = asyncHandler(async(req,res)=> {
     try {
          const comments = await Comment.find({}).populate("user");
          res.json(comments)
     } catch (error) {
          res.json(error)
     }
})

export const createComment = asyncHandler(async(req, res)=>{
     const userId = req.userId;
     const {postId, description} = req.body;
     const userData = await User.findById(userId)
     blockUser(userData)
     verifyUser(userData)
     try {
          await Comment.create({
               post: postId,
               description: description,
               user: userId
          })
          res.json("نظر ارسال شد")
     } catch (error) {
          res.json(error)
     }
})

export const getSingleComment = asyncHandler(async(req,res)=> {
     const {id} = req.params;
     validateMongodbId(id)
     try {
          const comment = await Comment.findById(id);
          res.json(comment)
     } catch (error) {
          res.json(error)
     }
})

export const updateComment = asyncHandler(async(req,res)=> {
     const {id} = req.params;
     try {
          const update = await Comment.findByIdAndUpdate(id, {
               post: req.body.postId,
               user: req.userId,
               description: req.body.description,
          },{
               new: true,
               runValidators: true,
          })
          res.json(update)
     } catch (error) {
          res.json(error)
     }
})


export const deleteComment = asyncHandler(async(req,res)=> {
     const {id} = req.params;
     try {
          await Comment.findByIdAndDelete(id);
          res.json("نظر با موفقیت حذف شد.")
     } catch (error) {
         res.json(error) 
     }
})