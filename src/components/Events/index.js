import React from 'react'
import Event from './Event'
import { graphql } from 'gatsby'

const Events = ({ events, title, description }) => {
  return (
    <>
      <h3>{title}</h3>
      <p className="mb-2">{description}</p>
      <div className="grid-md-2 events__item">
        {events.map((event) => {
          const {
            elements: {
              title: { value: title },
              media: {
                value: [
                  {
                    elements: {
                      video_id: { value: video_id },
                      thumbnail: {value: thumbnail},
                    },
                  },
                ],
              },
            },
          } = event
          return <Event key={title} title={title} url={video_id} thumbnail={thumbnail} />
        })}
      </div>
    </>
  )
}

export default Events

export const query = graphql`
  fragment events on kontent_item_events {
    elements {
      title {
        value
      }
      description {
        value
      }
      events {
        value {
          ...event
        }
      }
    }
  }
`
