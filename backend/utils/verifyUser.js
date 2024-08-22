export const verifyUser = (user) => {
     if(!user.isAccountVerified){
          throw new Error("شما باید ابتدا حساب کاربری خود را تایید کنید.")
     }
}