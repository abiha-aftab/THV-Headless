import React from 'react'
import { ImageElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import LazyImg from './lazy-load'

const Image = ({ image, className, layout = 'constrained', alt }) => {
  const { url } = image
  if (url.includes('.svg')) {
    return <LazyImg className="fluid" alt={alt} datasrc={url} />
  } else {
    return (
      <ImageElement
        image={image}
        layout={layout}
        alt={alt}
        className={className}
      />
    )
  }
}

export default Image

export const query = graphql`
  fragment image on kontent_item_image {
    elements {
      image_alt {
        value
      }
      image {
        value {
          url
          width
          height
        }
      }
    }
  }
`
