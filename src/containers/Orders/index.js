import React from 'react'
import OrderBasic from '../../components/Order'
import { useTheme } from '../../hooks/useTheme'
import { Link } from 'gatsby'

const Orders = ({languageCode = 'en'}) => {
  const { state } = useTheme()
  return (
    <div className="section container">
      <h3 className="mb-2">My orders</h3>
      {state.orders.length !== 0 &&
        state.orders.map((order, index) => {
          return <OrderBasic key={index} data={order} />
        })}
      {state.orders.length !== 0 && (
        <Link
          aria-label="Next page, to checkout"
          className="btn btn-crimson"
          to={languageCode === 'en' ? '/checkout' : `/${languageCode}/checkout`}
        >
          Next
        </Link>
      )}
      {!state.orders.length && <h4>There is nothing in your cart</h4>}
    </div>
  )
}

export default Orders
