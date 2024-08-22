import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import PostLists from '../../components/HomeScreen/PostList/PostLists'
import SideBar from '../../components/HomeScreen/Sidebar/SideBar'

const HomeScreen = () => {
  return (
    <div className="container">
         <Navbar/>

         <div className="columns mt-5">
              <div className="column is-two-thirds">
                  <PostLists /> 
              </div>
              <div className="column">
                    <SideBar />
              </div>
         </div>
    </div>
  )
}

export default HomeScreen