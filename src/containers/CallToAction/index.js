import { graphql } from 'gatsby'
import React from 'react'
import Cta from '../../components/Cta'

const CallToAction = ({ data }) => {
  const {
    title: { value: title },
    cta: {
      value: [
        {
          elements: {
            text: { value: text },
            link: { value: link },
          },
        },
      ],
    },
  } = data
  return (
    <section className="container section">
      <h2>{title}</h2>
      <Cta link={link} text={text} />
    </section>
  )
}

export default CallToAction

export const query = graphql`
  fragment call_to_action on kontent_item_call_to_action {
    elements {
      title {
        value
      }
      cta {
        value {
          ...cta
        }
      }
    }
  }
`