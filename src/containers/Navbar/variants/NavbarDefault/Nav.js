import React, { useEffect, useRef, useState } from 'react'
import Item from './Item'
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa'
import { navigate } from 'gatsby'
import { DEFAULT_LANGUAGE } from '../../../../utils/constants'
import { useTheme } from '../../../../hooks/useTheme'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

const Nav = ({ navLinks, mobile, languageCode = DEFAULT_LANGUAGE, languages = [] }) => {
  const { state, actions } = useTheme()
  const searchRef = useRef(false)
  const [openLanguageSelector, setOpenLanguageSelector] = useState(false)
  useEffect(() => {
    if(!mobile)
      setOpenLanguageSelector(false)
  }, [mobile])

  let translatedItemSearch = ''
  if (state.translations.length) {
    const key = 'Search'
    translatedItemSearch = prepareTranslations(state.translations, key)
  }

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
                translatedItemSearch?.Placeholder
                  ? translatedItemSearch?.Placeholder
                  : 'Search...'
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
      {!openLanguageSelector && navLinks.map((link, index) => {
        return <Item link={link} key={index} index={index} />
      })}
      {mobile && (
        <>
          <li className="navbarDefault__nav-language-selector">
            <button
              onClick={() => {setOpenLanguageSelector(!openLanguageSelector)}}
              className={`navbarDefault__nav-link${openLanguageSelector ? ' active' : ''}`}
            >
              {languageCode.toUpperCase()}
              {openLanguageSelector ? <FaChevronLeft className="left"/> : <FaChevronRight className="right"/>}
            </button>
          </li>
          {openLanguageSelector && languages.length > 0 && (
            languages.map((language, key) => {
              if (language.name.toLowerCase() !== languageCode.toLowerCase())
                return (
                  <li key={key} className="navbarDefault__nav-language">
                    <a target="_blank" rel="noreferrer" href={language.url} onClick={() => actions.changeLanguage(language)} className="navbarDefault__nav-link language-link">{language.name}</a>
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
