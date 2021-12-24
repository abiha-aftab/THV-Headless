import { graphql } from 'gatsby'
import React from 'react'
import Model from './variants/Model'
import Pdf from './variants/Pdf'

const Resource = ({ data, id }) => {
  const {
    title: { value: title },
    description: { value: description },
    variant: {
      value: [{ codename: variant, name }],
    },
    media: {
      value: [{ elements: media }],
    },
    pricing__price: { value: price },
  } = data

  const shortTitle = title.length > 50 ? title.substring(0, 50) + '...' : title

  switch (variant) {
    case 'n3d_model':
      return (
        <Model
          id={id}
          title={shortTitle}
          description={description}
          name={name}
          media={media}
          price={price}
        />
      )
    case 'pdf':
      return (
        <Pdf
          id={id}
          title={shortTitle}
          description={description}
          name={name}
          media={media}
          price={price}
        />
      )
    default:
      return null
  }
}

export default Resource

export const query = graphql`
  fragment resource on kontent_item_resource {
    id
    elements {
      title {
        value
      }
      description {
        value
      }
      media {
        value {
          ...image
          ...pdf
        }
      }
      variant {
        value {
          codename
          name
        }
      }
      pricing__price {
        value {
          codename
        }
      }
    }
  }
`
