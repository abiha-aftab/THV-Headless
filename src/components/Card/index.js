import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { graphql } from 'gatsby'
import Image from '../Image'
import Video from '../Video'
import { FaChevronRight } from 'react-icons/fa'

const Card = ({ data, system }) => {
  const {
    title: { value: title },
    media: { value: media },
    details: { value: details },
  } = data
  const { id, codename } = system
  return (
    <div
      className="card"
      data-kontent-item-id={id}
      data-kontent-element-codename={codename}
    >
      {media &&
        media.map((item, index) => {
          const {
            elements,
            system: { type },
          } = item
          switch (type) {
            case 'video':
              const {
                video_id: { value: video_id },
                thumbnail: { value: thumbnail },
              } = elements
              return (
                <div className="card__video" key={index}>
                  <Video url={video_id} title={title} thumbnail={thumbnail} />
                  <div className="card__video-footer">
                    <p>{title}</p>
                    <div className="card__video-footer-watch-now">
                      <a href={`https://youtu.be/${video_id}`} target="_blank">
                        {' '}
                        Watch now{' '}
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
          }
        }
      }
      details {
        value
      }
    }
  }
`
