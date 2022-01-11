import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import React from 'react'
import getStyles from '../../utils/getStyles'
import renderLinkedItem from '../../utils/renderLinkedItem'
import SocialSharing from '../SocialSharing'

const InfoBlock = ({ data, id, code, socialSharing = null }) => {
  const { backgroundColor, paddingTop, paddingBottom } = getStyles(data)
  const {
    content: { value: content, modular_content },
  } = data
  return (
    <section
      className={`${backgroundColor} section ${paddingTop} ${paddingBottom}`}
    >
      <div
        className="container infoblock"
        data-kontent-item-id={id}
        data-kontent-element-codename={code}
      >
        {socialSharing && socialSharing.sources.length > 0 && (
          <SocialSharing
            label={socialSharing.label}
            text={socialSharing.text}
            sources={socialSharing.sources}
          />
        )}
        <RichTextElement
          value={content}
          linkedItems={modular_content}
          resolveLinkedItem={(linkedItem) =>
            renderLinkedItem(linkedItem, id, code)
          }
        />
      </div>
    </section>
  )
}

export default InfoBlock

export const query = graphql`
  fragment info_block on kontent_item_info_block {
    system {
      id
      codename
    }
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
          ...cards
          system {
            type
            codename
          }
        }
      }
    }
  }
`
