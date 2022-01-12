import React, { useEffect, useState } from 'react'
import OrderBasic from '../../components/Order'
import { useTheme } from '../../hooks/useTheme'
import { Link } from 'gatsby'
import { prepareTranslations } from '../../utils/prepareTranslations'
import { FaChevronRight } from 'react-icons/fa'

const Orders = ({ languageCode = 'en' }) => {
  const { state } = useTheme()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const tmpOrders = state.orders.filter((order) => {
      return order.locale === languageCode
    })
    setOrders(tmpOrders)
  }, [state.orders])

  let translatedItemCheckout = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
  }

  return (
    <div className="section container">
      {orders.length !== 0 &&
        <div className="grid-md-12 orderBasic">
          <div className="col-md-9 orderBasic__item-contain">
          <h3 className="mb-1">
            {translatedItemCheckout?.Title
              ? translatedItemCheckout?.Title
              : 'My Orders'}
          </h3>
          </div>
          <div className="col-md-3 orderBasic__quantity title">
          <h3 className="mb-1">
            {translatedItemCheckout?.Quantity
              ? translatedItemCheckout?.Quantity
              : 'Quantity'}
          </h3>
          </div>
          {orders.map((order, index) => {
            return <OrderBasic key={index} data={order} />
          })}
        </div>
      }
      {orders.length !== 0 && (
        <Link
          aria-label="Next page, to checkout"
          className="btn btn-crimson btn-next mt-2 mb-2"
          to={languageCode === 'en' ? '/checkout' : `/${languageCode}/checkout`}
        >
          {translatedItemCheckout?.NextStep
            ? translatedItemCheckout?.NextStep
            : 'Next'}
          <FaChevronRight/>
        </Link>
      )}
      {!orders.length && (
        <h4>
          {translatedItemCheckout?.EmptyCart
            ? translatedItemCheckout?.EmptyCart
            : 'There is nothing in your cart.'}
        </h4>
      )}
    </div>
  )
}

export default Orders
