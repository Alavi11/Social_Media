export const blockUser = (user) => {
     if(user.isBlocked){
          throw new Error("دسترسی شما محدود شده است")
     }
}