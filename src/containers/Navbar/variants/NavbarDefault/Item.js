import React from 'react'
import { Link } from 'gatsby'

const Item = ({ link, index }) => {
  const { title, url, type, show } = link
  return (
    type === 'page' && show &&
      <li className="navbarDefault__nav-item" key={index}>
        <Link
          to={url}
          className="navbarDefault__nav-link"
          activeClassName="navbarDefault__nav-link--active"
        >
          {title}
        </Link>
      </li>
  )
}

export default Item
