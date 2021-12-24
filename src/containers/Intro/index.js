import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import Image from '../../components/Image'

const Intro = ({ data }) => {
  const [
    {
      elements: {
        title: { value: title },
        subtitle: { value: subtitle },
        description: { value: description },
        media: {
          value: [
            {
              elements: {
                image: {
                  value: [image],
                },
              },
            },
          ],
        },
      },
    },
  ] = data
  return (
    <section className="container-right grid-md-12 gap-4 intro">
      <div className="col-md-7 intro__content">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <RichTextElement value={description} />
      </div>
      <div className="col-md-5 d-none d-md-block">
        <Image image={image} className="intro__image" />
      </div>
    </section>
  )
}

export default Intro

export const query = graphql`
  fragment intro on kontent_item_intro {
    id
    elements {
      title {
        value
      }
      subtitle {
        value
      }
      media {
        value {
          ...image
        }
      }
      description {
        value
      }
    }
  }
`
