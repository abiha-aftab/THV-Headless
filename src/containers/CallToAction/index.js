import { graphql } from 'gatsby'
import React from 'react'
import Cta from '../../components/Cta'
import { DEFAULT_LANGUAGE } from '../../utils/constants'

const CallToAction = ({
  data,
  languageCode = DEFAULT_LANGUAGE,
  id,
  codename,
}) => {
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
    <section
      data-kontent-item-id={id}
      data-kontent-element-codename={codename}
      className={`container section cta${title ? ' with-title' : ''}`}
    >
      {title && <h2 className="cta__title">{title}</h2>}
      <Cta link={link} text={text} languageCode={languageCode} />
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
