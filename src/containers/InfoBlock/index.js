import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import React from 'react'
import getStyles from '../../utils/getStyles'
import renderLinkedItem from '../../utils/renderLinkedItem'

const InfoBlock = ({ data }) => {
  const { backgroundColor, paddingTop, paddingBottom } = getStyles(data)
  const {
    content: { value: content, modular_content },
  } = data

  return (
    <section className={`${backgroundColor} section ${paddingTop} ${paddingBottom}`}>
      <div className="container infoblock">
        <RichTextElement
          value={content}
          linkedItems={modular_content}
          resolveLinkedItem={(linkedItem) => renderLinkedItem(linkedItem)}
        />
      </div>
    </section>
  )
}

export default InfoBlock

export const query = graphql`
  fragment info_block on kontent_item_info_block {
    elements {
      backgroundColor: styling_options__background_color {
        value {
          codename
        }
      }
      paddingBottom: styling_options__padding_bottom {
        value {
          codename
        }
      }
      paddingTop: styling_options__padding_top {
        value {
          codename
        }
      }
      content {
        value
        modular_content {
          ...table
          ...infographics
          system {
            type
            codename
          }
        }
      }
    }
  }
`
