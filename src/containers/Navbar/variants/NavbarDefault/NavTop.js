import React, { useRef, useState, useEffect } from 'react'
import Dropdown from './Dropdown'
import { MdSearch } from 'react-icons/md'
import { navigate } from 'gatsby'
import { useTheme } from '../../../../hooks/useTheme'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

const NavTop = ({ languageCode = 'en', languages = [] }) => {
  const [searchClicked, setSearchClicked] = useState(false)
  const searchRef = useRef(null)
  const { state } = useTheme()

  let key = 'Basket'
  let translatedItems
  if (state.translations.length) {
    translatedItems = prepareTranslations(state.translations, key)
  }
  useEffect(() => {
    if (searchClicked) {
      searchRef.current.focus()
    }
  }, [searchClicked])

  return (
    <div className="navbarDefault__top-navbar">
      <ul>
        {!searchClicked && (
          <li onClick={() => setSearchClicked(true)}>
            <MdSearch /> search
          </li>
        )}
        {searchClicked && (
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
            <div>
              <MdSearch />
              <input
                type="text"
                name="search"
                placeholder="Search.."
                onMouseLeave={() => setSearchClicked(false)}
                ref={searchRef}
                className="navbarDefault__search-box"
              />
            </div>
          </form>
        )}
        <Dropdown
          type="cart"
          languageCode={languageCode}
          title={
            languageCode === 'de'
              ? translatedItems
                ? translatedItems?.Title
                : 'Warenkorbee'
              : translatedItems
              ? translatedItems?.Title
              : 'Basketee'
          }
        />
        <Dropdown
          type="language"
          title={languageCode.toUpperCase()}
          languageCode={languageCode}
          languages={languages}
        />
      </ul>
    </div>
  )
}

export default NavTop
