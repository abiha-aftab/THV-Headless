import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { FaPlus, FaMinus } from 'react-icons/fa'

const Quantity = ({ count, id }) => {
  const { state, actions } = useTheme()
  const handleAdd = () => {
    const updatedOrders = state.orders.map((order) => {
      if (order.id === id) order.count++
      return order
    })
    actions.changeOrders(updatedOrders)
  }
  const handleRemove = () => {
    const updatedOrders = state.orders.map((order) => {
      if (order.id === id) order.count--
      return order
    })
    actions.changeOrders(updatedOrders)
  }
  return (
    <div className="quantity">
      <h3>Quantity</h3>

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
