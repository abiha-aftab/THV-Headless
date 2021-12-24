import { graphql } from 'gatsby'
import React from 'react'

const Cta = ({ link, text }) => {
  return (
    <a href={link} className="btn btn-crimson">
      {text}
    </a>
  )
}

export default Cta

export const query = graphql`
  fragment cta on kontent_item_cta {
    elements {
      text {
        value
      }
      link {
        value
      }
    }
  }
`