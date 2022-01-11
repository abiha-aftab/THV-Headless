import React, { useState } from 'react'
import { Link } from 'gatsby'
import Image from '../../../Image'
import { BsCart } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa'
import { useTheme } from '../../../../hooks/useTheme'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

const Model = ({
  title,
  description,
  name,
  media,
  price,
  id,
  contentId,
  contentCodename,
  languageCode = 'en',
}) => {
  const {
    image: {
      value: [image],
    },
    image_alt: { value: alt },
  } = media
  const { state, actions } = useTheme()
  const [showBanner, setShowBanner] = useState(false)
  const updateOrders = () => {
    const order = {
      title,
      description,
      id,
      image,
      locale: languageCode,
    }
    actions.changeOrders([...state.orders, order])
    setShowBanner(true)
    setTimeout(() => {
      setShowBanner(false)
    }, 5000)
  }

  let translatedItemCheckout = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
  }

  return (
    <article
      className="resource"
      data-kontent-item-id={contentId}
      data-kontent-element-codename={contentCodename}
    >
      {showBanner && (
        <div className=" order-banner">
          <span>
            "{title}"
            {translatedItemCheckout?.AddedToCart
              ? translatedItemCheckout?.AddedToCart
              : ' has been added to your cart!'}
          </span>
          <Link
            to={
              languageCode === 'en' ? '/basket' : `/${languageCode}/warenkorb`
            }
            className="btn"
          >
            {translatedItemCheckout?.ViewBasket
              ? translatedItemCheckout?.ViewBasket
              : 'View Basket'}
            <FaChevronRight />
          </Link>
        </div>
      )}
      <Image image={image} layout="fullWidth" alt={alt} />
      <div className="resource__body">
        <div className="resource__type">{name}</div>
        <h4>{title}</h4>
        {description}
      </div>
      <div className="resource__footer resource__footer--model">
        {price.length !== 0 && (
          <button className="resource__purchase" onClick={updateOrders}>
            <BsCart /> Free
          </button>
        )}
      </div>
    </article>
  )
}

export default Model
