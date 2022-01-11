import { graphql } from 'gatsby'
import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const References = ({ data }) => {
  const [
    {
      elements: {
        references: { value: references },
      },
      system: { id, codename },
    },
  ] = data

  return (
    <div
      className="container section references"
      data-kontent-item-id={id}
      data-kontent-element-codename={codename}
    >
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
