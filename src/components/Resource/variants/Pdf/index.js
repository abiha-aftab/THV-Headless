import { graphql, Link } from 'gatsby'
import React, { useState } from 'react'
import Image from '../../../Image'
import { BsDownload, BsCart } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa'
import { useTheme } from '../../../../hooks/useTheme'
import PDFViewer from '../../../PDFViewer'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

const Pdf = ({
  title,
  description,
  name,
  media,
  price,
  id,
  languageCode = 'en',
  contentId,
  contentCodename,
}) => {
  const {
    media: {
      value: [
        {
          elements: {
            image: {
              value: [image],
            },
            image_alt: { value: alt },
          },
        },
      ],
    },
    pdf: {
      value: [{ url }],
    },
  } = media

  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { state, actions } = useTheme()
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
      <div className="resource__image" onClick={() => setShowModal(true)}>
        <Image image={image} layout="fullWidth" alt={alt} />
      </div>
      <div className="resource__body">
        <div className="resource__type">{name}</div>
        <h4 className="resource__title" onClick={() => setShowModal(true)}>
          {title}
        </h4>
        {description}
      </div>
      <div className="resource__footer">
        <a
          href={url}
          className="resource__download"
          target="_blank"
          rel="noreferrer"
          aria-label={`Download the ${title} PDF`}
        >
          <BsDownload /> Download
        </a>
        {url && (
          <PDFViewer
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={{ title, description, url, image, price }}
            trigger={
              'This information is not a substitute for talking with your doctor.'
            }
            languageCode={languageCode}
          />
        )}
        {price.length !== 0 && (
          <button className="resource__purchase" onClick={updateOrders}>
            <BsCart /> Free
          </button>
        )}
      </div>
    </article>
  )
}

export default Pdf

export const query = graphql`
  fragment pdf on kontent_item_pdf {
    elements {
      pdf {
        value {
          url
        }
      }
      media {
        value {
          ...image
        }
      }
    }
  }
`
