import asyncHandler from "express-async-handler"
import Category from "../../models/category/Category.js";

export const getAllCategory = asyncHandler(async(req,res)=> {
     try {
          const category = await Category.find({}).populate("user")
          res.json(category)
     } catch (error) {
          res.json(error)
     }
})


export const createCategory = asyncHandler(async(req, res)=> {
     const userId = req.userId;
     const title = req.body.title;
     try {
          await Category.create({
               user: userId,
               title: title
          })
          res.json("دسته بندی ایجاد شد")
     } catch (error) {
          res.json(error)
     }
})


export const getSingleCategory = asyncHandler(async(req,res)=>{
     const {id} = req.params;
     try {
          const category = await Category.findById(id).populate("user");
          res.json(category)
     } catch (error) {
          res.json(error)
     }
})



export const updateCategory = asyncHandler(async(req, res)=> {
     const {id} = req.params;
     try {
          const category = await Category.findByIdAndUpdate(id, {
               title: req.body.title
          }, {
               new: true
          })
          res.json("ویرایش دسته بندی موفقیت آمیز بود")
     } catch (error) {
          
          res.json(error)
     }
})

export const deleteCategory = asyncHandler(async(req,res)=>{
     const {id} = req.params;
     try {
          await Category.findByIdAndDelete(id)
          res.json("حذف دسته بندی موفقیت آمیز بود")
     } catch (error) {
          res.json(error)
     }
})