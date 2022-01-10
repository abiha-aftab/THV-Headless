import React from 'react'
import { Link } from 'gatsby'

const NavLinks = ({ navLinks }) => {
  return (
    <ul className="footerDefault__navigation-links">
      {navLinks.map((link, index) => {
        const {title, url, show} = link
        if(!show)
          return
        else
          return (
            <li key={index} className="footerDefault__navigation-link-item">
              {
                url.indexOf('https') !== -1
                  ? <a href={url} target="_blank" rel="noreferrer">{title}</a>
                  : <Link to={url}>{title}</Link>
              }
            </li>
          )
      })}
      <li className="footerDefault__navigation-link-item" key="teconsent"><div id="teconsent"></div></li>
    </ul>
  )
}

export default NavLinks
