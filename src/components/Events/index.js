import React from 'react'
import Event from './Event'
import { graphql } from 'gatsby'

const Events = ({ events, title, description, id, codename }) => {
  return (
    <div data-kontent-item-id={id} data-kontent-element-codename={codename}>
      <h3>{title}</h3>
      <p className="mb-2">{description}</p>
      <div
        className="grid-md-2 events__item"
        data-kontent-item-id={id}
        data-kontent-element-codename="events"
        data-kontent-add-button
        data-kontent-add-button-render-position="bottom"
        data-kontent-add-button-insert-position="after"
      >
        {events.map((event) => {
          const {
            elements: {
              title: { value: title },
              media: {
                value: [
                  {
                    elements: {
                      video_id: { value: video_id },
                      thumbnail: { value: thumbnail },
                    },
                  },
                ],
              },
            },
            system: { id: contentId, codename: contentCodename },
          } = event
          return (
            <Event
              key={title}
              title={title}
              url={video_id}
              thumbnail={thumbnail}
              id={contentId}
              codename={contentCodename}
            />
          )
        })}
      </div>
    </div>
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
          system {
            id
            codename
          }
        }
      }
    }
  }
`
