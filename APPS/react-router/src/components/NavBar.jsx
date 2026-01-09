import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <nav>
           <NavLink className={(e)=>{return e.isActive ? "class-blue" : ""}} to="/"><li>Home</li></NavLink>
           <NavLink className={(e)=>{return e.isActive ? "class-blue" : ""}} to="/about"><li>About</li></NavLink>
           <NavLink className={(e)=>{return e.isActive ? "class-blue" : ""}} to="/login"><li>Login</li></NavLink>
        </nav>
    </div>
  )
}

export default NavBar