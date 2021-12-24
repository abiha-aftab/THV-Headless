import React from 'react'
import Image from '../Image'
import Quantity from './Quantity'
import { useTheme } from '../../hooks/useTheme'
import { FaTimes } from 'react-icons/fa'

const OrderBasic = ({ data }) => {
  const { title, description, image, count, id } = data
  const { state, actions } = useTheme()
  const removeOrder = () => {
    const filteredOrders = state.orders.filter((order) => order.id !== id)
    actions.changeOrders(filteredOrders)
  }
  return (
    <div className="grid-md-12 orderBasic">
      <div className="col-md-10">
        <div className="orderBasic__item">
          <Image className="orderBasic__image" image={image} />
          <div className="orderBasic__body">
            <h3 className="text-slate">{title}</h3>
            <p>{description}</p>

            <button className="orderBasic__remove" onClick={removeOrder}>
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <Quantity count={count} id={id} />
      </div>
    </div>
  )
}

export default OrderBasic
