import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import Image from '../Image'

const Infographic = ({ data, system }) => {
  console.log('infograph ', data)
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

  const { id, codename } = system ?? null
  return (
    <>
      <div className="infographics__item" />
      <div
        className="infographics__item"
        data-kontent-item-id={id}
        data-kontent-element-codename={codename}
      >
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
          system {
            id
            codename
          }
        }
      }
      footnote {
        value
      }
    }
  }
`
