import { graphql, Link } from 'gatsby'
import React from 'react'
import { DEFAULT_LANGUAGE } from '../../utils/constants'
import { FaChevronRight } from 'react-icons/fa'

const Cta = ({ link, text, languageCode = DEFAULT_LANGUAGE, id, codename }) => {
  return (
    <div
      className="cta__btn"
      data-kontent-item-id={id}
      data-kontent-element-codename={codename}
    >
      {link.indexOf('https') !== -1 ? (
        <a href={link} className="btn btn-crimson">
          {text}
        </a>
      ) : (
        <Link
          className="btn btn-crimson"
          to={`${languageCode !== 'en' ? `/${languageCode}` : ``}/${link
            .replace(/^\/+|\/+$/g, '')
            .toLowerCase()
            .trim()}`}
        >
          {text} <FaChevronRight />
        </Link>
      )}
    </div>
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
