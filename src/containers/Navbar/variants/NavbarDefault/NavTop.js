import React, { useRef, useState, useEffect } from 'react'
import Dropdown from './Dropdown'
import { MdSearch } from 'react-icons/md'
import { navigate } from 'gatsby'
import { useTheme } from '../../../../hooks/useTheme'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

let useClickOutside = (handler) => {
  let domNode = useRef()
  useEffect(() => {
    let mouseDownHandler = (event) => {
      if (!domNode?.current?.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', mouseDownHandler)
    return () => {
      document.removeEventListener('mousedown', mouseDownHandler)
    }
  })
  return domNode
}

const NavTop = ({ languageCode = 'en', languages = [] }) => {
  const [searchClicked, setSearchClicked] = useState(false)

  //input should hide when clicked outside
  let searchRef = useClickOutside(() => {
    setSearchClicked(false)
  })

  const { state } = useTheme()

  let translatedItemBasket = ''
  let translatedItemSearch = ''
  if (state.translations.length) {
    let key = 'Basket'
    translatedItemBasket = prepareTranslations(state.translations, key)
    key = 'Search'
    translatedItemSearch = prepareTranslations(state.translations, key)
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
            <MdSearch />
            {translatedItemSearch?.Search
              ? translatedItemSearch?.Search
              : 'Search'}
          </li>
        )}
        {searchClicked && (
          <li>
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
                className="navbarDefault__search-box"
              />
            </form>
          </li>
        )}
        <Dropdown
          type="cart"
          title={
            languageCode === 'de'
              ? translatedItemBasket
                ? translatedItemBasket?.Title
                : 'Warenkorb'
              : translatedItemBasket
              ? translatedItemBasket?.Title
              : 'Basket'
          }
          languageCode={languageCode}
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
