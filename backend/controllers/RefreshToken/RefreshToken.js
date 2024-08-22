import jwt from "jsonwebtoken";
import User from "../../models/user/User.js";
export const refreshToken = async(req, res) => {
     try {
          const refreshToken = req.cookies.refreshToken;
          if(!refreshToken) return res.sendStatus(401);
          const user = await User.findOne({refresh_token: refreshToken})
          if(!user) return res.sendStatus(403)
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
               if(err) return res.sendStatus(403)
               const userId = user._id;
               const firstName = user.firstName;
               const lastName = user.lastName;
               const emailuser = user.email;
               const profilePhoto = user.profilePhoto;
               const admin = user.isAdmin;
               const isAccountVerified = user.isAccountVerified;
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

                  res.json({accessToken})
          })

     } catch (error) {
          console.log(error);
     }
}