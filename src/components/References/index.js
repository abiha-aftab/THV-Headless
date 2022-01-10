import { graphql } from 'gatsby'
import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const References = ({ data }) => {
  const [
    {
      elements: {
        references: { value: references },
      },
    },
  ] = data

  return (
    <div className="container section references">
      <RichTextElement value={references} />
    </div>
  )
}

export default References

export const query = graphql`
  fragment references on kontent_item_references {
    elements {
      references {
        value
      }
    }
  }
`
