import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { FaCaretDown } from 'react-icons/fa'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Link } from 'gatsby'
import { useTheme } from '../../../../hooks/useTheme'
import { ImageElement } from '@kentico/gatsby-kontent-components'

export default function Dropdown({ type, title, languageCode = 'en', languages = [] }) {
  let [isOverButton, setIsOverButton] = useState(false)
  let [isOverList, setIsOverList] = useState(false)
  let [isOpen, setIsOpen] = useState()
  let [isTouchInput, setIsTouchInput] = useState()
  let [hasClicked, setHasClicked] = useState()
  let button = useRef(null)

  useLayoutEffect(() => {
    if (isOpen && !isOverButton && !isOverList && !isTouchInput) {
      button.current.click()
      setIsOpen(false)
    } else if (!isOpen && (isOverButton || isOverList) && !isTouchInput) {
      button.current.click()
      setIsOpen(true)
    }
  }, [isOpen, isOverButton, isOverList, isTouchInput])

  useEffect(() => {
    setIsTouchInput(false)
    setHasClicked(false)
  }, [hasClicked])

  const { state } = useTheme()

  const count = state.orders.reduce((acc, val) => {
    return acc + val.count
  }, 0)

  return type === 'cart' ? (
    <li className="basket">
      <button
        ref={button}
        onTouchStart={() => {
          setIsTouchInput(true)
        }}
        onMouseEnter={(event) => {
          setIsOverButton(true)
        }}
        onMouseLeave={(event) => {
          setIsOverButton(false)
        }}
        onClick={() => {
          setHasClicked(true)
          setIsOpen(!isOpen)
        }}
        onKeyDown={() => {
          setIsOpen(!isOpen)
        }}
      >
        <RiShoppingBasketLine />
        <Link to={languageCode === 'en' ? '/basket' : `/${languageCode}/warenkorb`}>
          <span className="quantity">{count}</span> {title}
        </Link>
      </button>
      {isOpen && (
        <button
          className="basket-items no-items"
          onMouseEnter={(event) => {
            setIsOverList(true)
          }}
          onMouseLeave={(event) => {
            setIsOverList(false)
          }}
        >
          {state.orders.length === 0 ? (
            <div className="empty">
              <RiShoppingBasketLine />
              <p>Resource order</p>
              <p>No resources have been added to the basket yet.</p>
            </div>
          ) : (
            <div className="basket__items-contain">
              <p>Resource order</p>
              {state.orders.map((order, key) => {
                return (
                  <div key={key} className="item">
                    <ImageElement
                      image={order.image}
                      alt={`${order.title} image`}
                      className="item-icon"
                    />
                    <p>{order.title}</p>
                  </div>
                )
              })}
              <Link className="basket-link" to={languageCode === 'en' ? '/basket' : `/${languageCode}/warenkorb`}>
                Go to Basket <RiArrowRightSLine />
              </Link>
            </div>
          )}
        </button>
      )}
    </li>
  ) : (
    <li className="language-selector">
      <button
        ref={button}
        onTouchStart={() => {
          setIsTouchInput(true)
        }}
        onMouseEnter={(event) => {
          setIsOverButton(true)
        }}
        onMouseLeave={(event) => {
          setIsOverButton(false)
        }}
      >
        {title}
        <FaCaretDown />
      </button>
      {isOpen && (
        <button
          className="language-container"
          onMouseEnter={(event) => {
            setIsOverList(true)
          }}
          onMouseLeave={(event) => {
            setIsOverList(false)
          }}
        >
          {languages.map((language, key) => {
            if(language.name.toLowerCase() !== languageCode.toLowerCase())
              return <Link key={key} to={language.url} className="language">{language.name}</Link>
          })}
        </button>
      )}
    </li>
  )
}
