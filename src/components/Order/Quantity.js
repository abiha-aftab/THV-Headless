import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { prepareTranslations } from '../../utils/prepareTranslations'

const Quantity = ({ count, id }) => {
  const { state, actions } = useTheme()
  const [showBanner, setShowBanner] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  let translatedItemCheckout = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
  }

  const handleAdd = () => {
    const updatedOrders = state.orders.map((order) => {
      if (order.id === id) {
        order.count++
        setSelectedOrder(order)
      }
      return order
    })
    actions.changeOrders(updatedOrders)
    setShowBanner(true)
    setTimeout(() => {
      setShowBanner(false)
    }, 3000)
  }
  const handleRemove = () => {
    const updatedOrders = state.orders.map((order) => {
      if (order.id === id) {
        order.count--
        setSelectedOrder(order)
      }
      return order
    })
    actions.changeOrders(updatedOrders)
    if (count > 1) {
      setShowBanner(true)
      setTimeout(() => {
        setShowBanner(false)
      }, 3000)
    }
  }
  return (
    <div className="quantity">
      {showBanner && (
        <div className=" order-banner">
          <span>
            "{selectedOrder?.title}"{' '}
            {translatedItemCheckout?.QuantityUpdated
              ? translatedItemCheckout?.QuantityUpdated
              : ' quantity has been updated'}
          </span>
          <button
            onClick={() => {
              setShowBanner(false)
            }}
            className="btn"
          >
            <GrClose />
          </button>
        </div>
      )}
      <div className="quantity__controls">
        <button className="quantity__btn" onClick={handleRemove}>
          <FaMinus />
        </button>
        <div className="quantity__count">{count}</div>
        <button className="quantity__btn" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default Quantity
