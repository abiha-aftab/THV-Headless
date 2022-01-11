import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../hooks/useTheme'
import { Link } from 'gatsby'
import { DEFAULT_LANGUAGE } from '../../../../utils/constants'
import { ImageElement } from '@kentico/gatsby-kontent-components'
import { RiArrowRightSLine } from 'react-icons/ri'
import { FiX } from 'react-icons/fi'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

const Basket = ({ languageCode = DEFAULT_LANGUAGE, setBasketMobile }) => {
  const { state } = useTheme()
  const [orders, setOrders] = useState([])

  let translatedItemBasket = ''
  if (state.translations.length) {
    let key = 'Basket'
    translatedItemBasket = prepareTranslations(state.translations, key)
  }

  useEffect(() => {
    const tmpOrders = state.orders.filter((order) => {
      return order.locale === languageCode
    })
    setOrders(tmpOrders)
  }, [state.orders])

  const toggleBasketMobile = () => {
    setBasketMobile(false)
  }

  return (
    <div className="basketMobile">
      <div className="basketMobile__container">
        <div className="basketMobile__close"><FiX onClick={toggleBasketMobile}/></div>
        {orders.length === 0 ? (
            <div className="basketMobile__empty">
              <p>
                {translatedItemBasket?.EmptyBasket
                  ? translatedItemBasket?.EmptyBasket
                  : 'No resources have been added to the basket yet.'
                }
              </p>
            </div>
          ) : (
            <div className="basketMobile__items">
              {orders.map((order, key) => {
                return (
                  <div key={key} className="basketMobile__items-item">
                    <ImageElement
                      image={order.image}
                      alt={`${order.title} image`}
                      className="basketMobile__items-item-image"
                    />
                    <p className="basketMobile__items-item-description">{order.title}</p>
                  </div>
                )})
              }
              <Link
                className="basketMobile__basket-link"
                to={
                  languageCode === 'en'
                    ? '/basket'
                    : `/${languageCode}/warenkorb`
                }
              >
                {translatedItemBasket?.Link
                  ? translatedItemBasket?.Link
                  : 'Go to Basket'}{' '}
                <RiArrowRightSLine />
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Basket
