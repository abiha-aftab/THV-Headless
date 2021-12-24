import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import Image from '../Image'

const Infographic = ({ data }) => {
  const {
    footnote: { value: footnote },
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
    title: { value: title },
  } = data
  return (
    <>
      <div className="infographics__item" />
      <div className="infographics__item">
        <RichTextElement value={title} /> 
        <Image image={image} alt={alt} />
        <RichTextElement value={footnote} />
      </div>
      <div className="infographics__item" />
    </>
  )
}
export default Infographic

export const query = graphql`
  fragment infographic on kontent_item_infographic {
    id
    elements {
      title {
        value
      }
      media {
        value {
          ...image
        }
      }
      footnote {
        value
      }
    }
  }
`
