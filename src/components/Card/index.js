import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import Image from '../Image'
import Video from '../Video'
import { FaChevronRight } from 'react-icons/fa'
import { useTheme } from '../../hooks/useTheme'
import { prepareTranslations } from '../../utils/prepareTranslations'

const Card = ({ data, system }) => {
  const { state } = useTheme()
  const {
    title: { value: title },
    media: { value: media },
    details: { value: details },
  } = data

  const { id, codename } = system
  let translatedItemCard = ''
  if (state.translations.length) {
    let key = 'Cards'
    translatedItemCard = prepareTranslations(state.translations, key)
  }

  return (
    <div
      className="card"
      data-kontent-item-id={id}
      data-kontent-element-codename={codename}
      data-kontent-add-button
      data-kontent-add-button-render-position="bottom"
      data-kontent-add-button-insert-position="after"
    >
      {media &&
        media.map((item, index) => {
          const {
            elements,
            system: { id: contentId, codename: contentCode, type },
          } = item
          switch (type) {
            case 'video':
              const {
                video_id: { value: video_id },
                thumbnail: { value: thumbnail },
              } = elements
              return (
                <div className="card__video" key={index}>
                  <Video
                    id={contentId}
                    code={contentCode}
                    url={video_id}
                    title={title}
                    thumbnail={thumbnail}
                  />
                  <div className="card__video-footer">
                    <p>{title}</p>
                    <div className="card__video-footer-watch-now">
                      <a href={`https://youtu.be/${video_id}`} target="_blank">
                        {' '}
                        {translatedItemCard?.Link}{' '}
                      </a>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              )
            case 'image':
              const {
                image: {
                  value: [image],
                },
                image_alt: { value: alt },
              } = elements
              return <Image image={image} alt={alt} key={index} />
            default:
              return <h1 key={index}>{type}</h1>
          }
        })}
      <div className="card__details">
        <RichTextElement value={details} />
      </div>
    </div>
  )
}
export default Card

export const query = graphql`
  fragment card on kontent_item_card {
    id
    elements {
      title {
        value
      }
      media {
        value {
          ...video
          ...image
          system {
            type
            codename
            id
          }
        }
      }
      details {
        value
      }
    }
  }
`
