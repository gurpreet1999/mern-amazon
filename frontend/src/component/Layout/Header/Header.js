import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'  >

<Link to={"/profile"}>profile</Link>


    </div>
  )
}

export default Header