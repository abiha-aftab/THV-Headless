import { graphql } from 'gatsby'
import React from 'react'
import Image from '../../../Image'
import { BsDownload, BsCart } from 'react-icons/bs'
import { useTheme } from '../../../../hooks/useTheme'

const Pdf = ({ title, description, name, media, price, id }) => {
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
