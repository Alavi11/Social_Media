import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: [true, "نام شما اجباری است"],
     },
     lastName: {
          type: String,
          required: [true, "نام خانوادگی شما شما اجباری است"],
     },
     profilePhoto: {
          type: String,
          default: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
     },
     email: {
          type: String,
          required: [true, "ایمیل شما اجباری است"],
     },
     bio: {
          type: String
     },
     password: {
          type: String,
          required: [true, "پسوورد شما اجباری است"],
     },
     isBlocked: {
          type: Boolean,
          default: false,
     },
     isAdmin: {
          type: Boolean,
          default: false,
     },
     isFollowing: {
          type: Boolean,
          default: false,
     },
     isAccountVerified: {
          type: Boolean,
          default: false
     },
     accountVerificationToken: String,
     accountVerificationTokenExpires: Date,
     viewedBy: {
          type: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
               }
          ]
     },
     followers: {
          type: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
               }
          ]
     },
     following: {
          type: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
               }
          ]
     },
     passwordChangeAt: Date,
     passwordResetToken: String,
     passwordResetExpire: Date,
     refresh_token:{
          type: String,
     }
},{
   toJSON: {
        virtuals: true
   },
   toObject: {
        virtuals: true,
   }  ,
   timestamps: true
})

userSchema.virtual("posts", {
     ref: "Post",
     foreignField: "user",
     localField: "_id",
})


userSchema.pre("save", async function (next){
     if(!this.isModified("password")){
         next(); 
     }
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt)
     next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword){
     return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.methods.createAccountVerificationToken = async function (){
     const verificationToken = crypto.randomBytes(32).toString("hex");
     this.accountVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
     this.accountVerificationTokenExpires = Date.now() + 30 *60 * 1000
     return verificationToken;
}


userSchema.methods.createPasswordResetToken = async function (){
     const resetToken = crypto.randomBytes(32).toString("hex");
     this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
     this.passwordResetExpire = Date.now() + 30 *60 * 1000
     return resetToken;
}



export default mongoose.model("User", userSchema)