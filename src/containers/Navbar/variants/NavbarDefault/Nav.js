import React from 'react'
import Item from './Item'
import { FaSearch } from 'react-icons/fa'

const Nav = ({ navLinks, mobile}) => {
  return (
    <>
      {mobile &&
        <div className="navbarDefault__search">
          <input type="text" placeholder="search" />
          <FaSearch/>
        </div>
      }
    <ul
      className={
        mobile
          ? 'navbarDefault__nav navbarDefault__nav--active'
          : 'navbarDefault__nav'
      }
    >
      {navLinks.map((link, index) => {
        return <Item link={link} key={index} index={index} />
      })}
    </ul>
    </>
  )
}

export default Nav
