import React, { useRef, useState } from 'react'
import Item from './Item'
import { FaChevronRight, FaChevronDown, FaSearch } from 'react-icons/fa'
import { Link, navigate } from 'gatsby'
import { DEFAULT_LANGUAGE } from '../../../../utils/constants'
import { useTheme } from '../../../../hooks/useTheme'

const Nav = ({ navLinks, mobile, languageCode = DEFAULT_LANGUAGE, languages = [] }) => {
  const { actions } = useTheme()
  const searchRef = useRef(false)
  const [openLanguageSelector, setOpenLanguageSelector] = useState(false)
  return (
    <>
      {mobile &&
        <div className="navbarDefault__search">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              navigate(
                languageCode === 'en'
                  ? `/search?s=${searchRef.current.value}`
                  : `/${languageCode}/search?s=${searchRef.current.value}`
              )
            }}
          >
            <input
              type="text"
              name="search"
              placeholder={
                'Search...'
              }
              ref={searchRef}
            />
            <FaSearch/>
          </form>
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
      {mobile && (
        <>
          <li className="navbarDefault__nav-language-selector">
            <button
              onClick={() => {setOpenLanguageSelector(!openLanguageSelector)}}
              className="navbarDefault__nav-link"
            >
              {languageCode.toUpperCase()}
              {openLanguageSelector ? <FaChevronDown/> : <FaChevronRight/>}
            </button>
          </li>
          {openLanguageSelector && languages.length > 0 && (
            languages.map((language, key) => {
              if (language.name.toLowerCase() !== languageCode.toLowerCase())
                return (
                  <li key={key} className="navbarDefault__nav-language">
                    <Link to={language.url} onClick={() => actions.changeLanguage(language)} className="navbarDefault__nav-link language-link">{language.name}</Link>
                  </li>
                )
            })
          )}
        </>
      )}
    </ul>
    </>
  )
}

export default Nav
