import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
     post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: [true, "شناسه پست الزامی است"]
     },
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "شناسه کاربر الزامی است"]
     },
     description:{
          type: String,
          required: [true, "شما باید نظری وارد کنید"]
     }
},{
     timestamps: true
})


export default mongoose.model("Comment", commentSchema)