import React from 'react'
import Image from '../../../Image'
import { useTheme } from '../../../../hooks/useTheme'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

const OrderCheckout = ({ data }) => {
  const { state } = useTheme()

  let translatedItemCheckout = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
  }

  const { title, count, image } = data
  return (
    <div className="orderCheckout">
      <Image image={image} className="orderCheckout__image" />
      <div className="orderCheckout__body">
        <div className="orderCheckout__title">{title}</div>
        <div className="orderCheckout__count">
          {translatedItemCheckout?.Qty ? translatedItemCheckout?.Qty : 'Qty'}:{' '}
          {count}
        </div>
      </div>
    </div>
  )
}

export default OrderCheckout
