import React from 'react'
import Image from '../../../Image'

const OrderCheckout = ({ data }) => {
  const { title, count, image } = data
  return (
    <div className="orderCheckout">
      <Image image={image} className="orderCheckout__image" />
      <div className="orderCheckout__body">
        <div className="orderCheckout__title">{title}</div>
        <div className="orderCheckout__count">Qty: {count}</div>
      </div>
    </div>
  )
}

export default OrderCheckout
