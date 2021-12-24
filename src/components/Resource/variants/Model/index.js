import React from 'react'
import Image from '../../../Image'
import { BsCart } from 'react-icons/bs'
import { useTheme } from '../../../../hooks/useTheme'

const Model = ({ title, description, name, media, price, id }) => {
  const {
    image: {
      value: [image],
    },
    image_alt: { value: alt },
  } = media
  const { state, actions } = useTheme()
  const updateOrders = () => {
    const order = {
      title,
      description,
      id,
      image,
    }
    actions.changeOrders([...state.orders, order])
  }
  return (
    <article className="resource">
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
