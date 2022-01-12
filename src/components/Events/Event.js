import React from 'react'
import { graphql } from 'gatsby'
import Video from '../Video'

const Event = ({ url, title, thumbnail, id, codename }) => {
  return (
    <article
      className="events__event"
      data-kontent-item-id={id}
      data-kontent-element-codename={codename}
    >
      <Video url={url} title={title} thumbnail={thumbnail} />
      <p className="mb-0">
        <strong>{title}</strong>
      </p>
    </article>
  )
}

export default Event

export const query = graphql`
  fragment event on kontent_item_event {
    elements {
      title {
        value
      }
      media {
        value {
          ...video
        }
      }
    }
  }
`
