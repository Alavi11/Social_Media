import React from 'react'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { useEffect } from 'react'

const VerifyAccount = () => {
     const {id} = useParams()
     const {verifyAccount,errorVerifyAccount} = useContext(AuthContext)
     useEffect(()=> {
          verifyAccount(id)
     }, [])


     if(errorVerifyAccount){
          return (
               <div className='pt-6 mt-6 has-text-centered'>
               <h1 className='has-text-success is-size-1 mt-6 pt-6'>{errorVerifyAccount}</h1>
               <Link to="/profile" className="button is-link is-size-4 mt-6">ارسال دوباره ایمیل تایید</Link>
          </div>
          )
     }
  return (
    <div className='pt-6 mt-6 has-text-centered'>
         <h1 className='has-text-success is-size-1 mt-6 pt-6'>حساب کاربری شما تایید شد</h1>
         <Link to="/profile" className="button is-link is-size-4 mt-6">رفتن به پروفایل</Link>
    </div>
  )
}

export default VerifyAccount