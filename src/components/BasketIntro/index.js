import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const BasketIntro = () => {
  const data = useStaticQuery(query)
  const {
    kontentItemBasket: {
      elements: {
        title: { value: title },
        description: { value: description },
      },
    },
  } = data
  return (
    <section className="section pb-3 container">
      <h1>{title}</h1>
      <RichTextElement value={description} />
    </section>
  )
}

export default BasketIntro

export const query = graphql`
  {
    kontentItemBasket {
      elements {
        title {
          value
        }
        description {
          value
        }
      }
    }
  }
`
