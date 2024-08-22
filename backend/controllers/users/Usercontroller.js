import User from "../../models/user/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { validateMongodbId } from "../../utils/vakidateMongoDbId.js";
import nodemailer from "nodemailer";
import crypto from "crypto"
import { cloudinaryUploadImage } from "../../utils/coudinary.js";
import fs from "fs";
import Post from "../../models/post/Post.js"
import Comment from "../../models/comment/Comment.js"


export const getUsers = asyncHandler(async(req, res)=> {
     try {
          const users = await User.find({});
          res.json(users)
     } catch (error) {
          res.json(error)
     }
})


export const userRegister = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) throw new Error("این کاربر قبلا ثبت نام کرده است");

  try {
    await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json("شما با موفقیت ثبت نام شدید");
  } catch (error) {
    res.json(error);
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.isPasswordMatched(password))) {
    const userId = userFound._id;
    const firstName = userFound.firstName;
    const lastName = userFound.lastName;
    const emailuser = userFound.email;
    const profilePhoto = userFound.profilePhoto;
    const admin = userFound.isAdmin;
    const isAccountVerified = userFound.isAccountVerified;
    const accessToken = jwt.sign(
      {
        userId,
        firstName,
        lastName,
        emailuser,
        profilePhoto,
        admin,
        isAccountVerified,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId,
        firstName,
        lastName,
        emailuser,
        profilePhoto,
        admin,
        isAccountVerified,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.findByIdAndUpdate(userId, {refresh_token: refreshToken})
    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        maxAge: 24*60*60*1000 
    })
    res.json({ 
      userId,
      firstName,
      lastName,
      emailuser,
      profilePhoto,
      admin,
      isAccountVerified,
      accessToken
    });
  } else {
    res.status(401);
    throw new Error("ایمیل یا پسوورد صحیح نیست.");
  }
});


export const logoutUser = asyncHandler(async(req,res)=>{
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.json("توکن پیدا نشد");
  const user = await User.findOne({refresh_token: refreshToken});
  if(!user) return res.json("کاربر پیدا نشد")
  user.refresh_token = undefined;
  await user.save();
  res.clearCookie("refreshToken");
  res.json("خروج موفقیت آمیز بود")
})


export const deleteUser = asyncHandler(async(req, res)=> {
    const id = req.params.id;
    try {
      await Post.deleteMany({user: id})
      await Comment.deleteMany({user: id})
      await User.findByIdAndDelete(id)
      res.json("حساب کاربری شما با موفقیت حذف شد")
    } catch (error) {
        res.json(error)
    }
})

export const detailUser = asyncHandler(async(req,res)=> {
  const {id} = req.params;

  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

export const profileUser = asyncHandler(async(req,res)=> {
  const {id} = req.params;
  const loginUserId = req.userId.toString();
  
  try {
    const myProfile = await User.findById(id)
    .populate("posts")
    .populate("viewedBy")
    .populate("followers")
    .populate("following")
    const alreadyViewed = myProfile.viewedBy.find((user)=> {
      return user._id.toString() === loginUserId
    })
    if(alreadyViewed){
      res.json(myProfile)
    }else{
      const profile = await User.findByIdAndUpdate(myProfile._id, {
        $push: {viewedBy: loginUserId}
      },{
        new: true
      });
      res.json(profile)
    }

  } catch (error) {
    res.json(error)
  }
})


export const updateUser = asyncHandler(async(req, res)=> {
  const id = req.userId

  await User.findByIdAndUpdate(id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
  })

  res.json("کاربر با موفقیت ویرایش شد")
  
})


export const updatePassword = asyncHandler(async(req,res)=> {
  const id = req.userId;
  const password = req.body.password;
  const user = await User.findById(id);
  if(password){
    user.password = password
    await user.save();
    res.json("پسوورد ویرایش شد.")
  }
})


export const followingUser = asyncHandler(async(req, res) => {
  const followId = req.body.followId;
  const loginUserId = req.userId;


  const targetUser = await User.findById(followId);

  const allFollowers = targetUser.followers.find((user) => 
    user.toString() === loginUserId.toString()
  )

  if(allFollowers) throw new Error("شما این کاربر را فالو کرده اید")


  await User.findByIdAndUpdate(followId, {
    $push : {followers : loginUserId},
    isFollowing: true
  }, {
    new: true
  })

  await User.findByIdAndUpdate(loginUserId, {
    $push: {following: followId}
  }, {
    new: true
  })

  res.json("شما این کاربر را فالو کردید")
})



export const unfollowUser = asyncHandler(async(req,res)=> {
  const unFollowId = req.body.unFollowId;
  const loginUserId = req.userId;

  await User.findByIdAndUpdate(unFollowId, {
    $pull : {followers: loginUserId},
    isFollowing: false
  }, {
    new : true
  })

  await User.findByIdAndUpdate(loginUserId, {
    $pull : {following: unFollowId}
  }, {
    new : true
  })

  res.json("کاربر آنفالو شد.")

})

export const findFollower = asyncHandler(async(req,res)=>{
  const userId = req.body.userId;
  const followedId = req.body.followId;

  const found = await User.findById(followedId)
  const alreadyUser = await found.followers.find(user => user.toString() === userId.toString())
  if(alreadyUser){
    res.json(true)
  }else{
    res.json(false)
  }
})


export const blockUser = asyncHandler(async(req, res)=> {
  const {id} = req.params;
  validateMongodbId(id)
  const user = await User.findByIdAndUpdate(id, {
    isBlocked: true,
  }, {
    new: true
  });
  res.json("کاربر مسدود شد.")
})

export const unBlockUser = asyncHandler(async(req,res) => {
  const {id} = req.params;
  validateMongodbId(id)
  const user = await User.findByIdAndUpdate(id, {
    isBlocked: false,
  }, {
    new: true
  })

  res.json(user)
})


const transporter = nodemailer.createTransport({
  service : "gmail",
  auth: {
    user: "videocode2021@gmail.com",
    pass: "euhdlsesyhasgbne"
  }
})


export const sendEmailMsg = asyncHandler(async(req,res)=> {
  const {to, subject, message, email} = req.body;
  try {
    let details = {
      from : email,
      to: to,
      subject: subject,
      text: message,
    }

    await transporter.sendMail(details)
    res.json("ایمیل با موفقیت ارسال شد.")

  } catch (error) {
    res.json(error)
  }
})



export const verifyUserEmail = asyncHandler(async(req,res)=> {
  const loginUser = req.body.user;
  const user = await User.findById(loginUser)
  try {

    const verificationToken = await user.createAccountVerificationToken();
    await user.save();

    const resetUrl = `این ایمیل برای تایید حساب کاربری شما ارسال شده است, برای تایید حساب روی لینک زیر کلیک کنید <a href="http://localhost:3000/verify-account/${verificationToken}">تایید حساب</a>`

    let details = {
      from : "videocode2021@gmail.com",
      to: user.email,
      subject: "تایید حساب کاربری",
      html: resetUrl
    }

    await transporter.sendMail(details, (err) => {
      if(err) {
        res.json(err);
      }else{
        res.json("برای فعالسازی حساب کاربری ایمیل خود را چک کنید.")
      }
    })

  } catch (error) {
    res.json(error)
  }
})

export const accountVerification = asyncHandler(async(req,res)=> {
  const {token} = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
  
  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: {$gt: new Date()},
  })

  if(!userFound) throw new Error("توکن منقضی شده است.")

  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();
  res.json(userFound)
})


export const forgetPasswordToken = asyncHandler(async(req, res)=>{
  const {email} = req.body;

  const user = await User.findOne({email});
  if(!user) throw new Error("کاربر وجود ندارد.");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();


    const resetUrl = `این ایمیل برای تغییر رمز حساب کاربری شما ارسال شده است, برای تغییر رمز روی لینک زیر کلیک کنید <a href="http://localhost:3000/reset-password/${token}">تغییر رمز عبور</a>`

    let details = {
      from : "videocode2021@gmail.com",
      to: email,
      subject: "تغییر رمز عبور",
      html: resetUrl
    }

    await transporter.sendMail(details,(err)=> {
      if(err){
        res.json(err)
      }else{
        res.json({msg: `ایمیلی برای شما ارسال شد`})
      }
    })

  } catch (error) {
    res.json(error)
  }
})


export const passwordReset = asyncHandler(async(req,res)=> {
  const {token, password} = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: {$gt: new Date()}
  })

  if(!user) throw new Error("توکن منقضی شده.")

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();

  res.json("پسوورد با موفقیت تغییر کرد اکنون میتوانید وارد شوید.")

})

export const profilePhotoUser = asyncHandler(async(req, res)=>{
 try {
  const loginUser = req.userId;
  const localPath = `public/images/profile/${req.file.filename}`
  const imageUploaded = await cloudinaryUploadImage(localPath)
  const foundUser = await User.findByIdAndUpdate(loginUser,{
    profilePhoto: imageUploaded.url
  },{
    new: true
  })
  fs.unlinkSync(localPath)
  res.json("عکس کاربری شما تغییر کرد")
 } catch (error) {
   console.log(error);
 }
})


export const getUsersPopular = asyncHandler(async(req, res)=> {
  try {
    const users = await User.find({}).sort("-followers").limit(10);
    res.json(users)
  } catch (error) {
    console.log(error);
  }
})