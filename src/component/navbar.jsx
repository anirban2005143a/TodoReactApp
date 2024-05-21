import React from 'react'
import "./navbar.css"
import logo from "../assets/logo.jpeg"

const navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <img src={logo}></img>
        <p>iTask</p>
      </div>
      <div>
        <ul className="list">
            <li>Home</li>
            <li>Your Todos</li>
        </ul>
      </div>
    </div>
  )
}

export default navbar
