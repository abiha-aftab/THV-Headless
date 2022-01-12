import { graphql } from 'gatsby'
import React from 'react'
import Resource from '../../components/Resource'

const Resources = ({ data, languageCode = 'en' }) => {
  const [
    {
      elements: {
        resources: { value: resources },
      },
      system: { id, codename },
    },
  ] = data
  return (
    <section
      className="section bg-steel"
      data-kontent-item-id={id}
      data-kontent-element-codename={codename}
    >
      <div
        className="container gap-2 grid-1 grid-md-3"
        data-kontent-item-id={id}
        data-kontent-element-codename={codename}
        data-kontent-add-button
        data-kontent-render-position="left"
        data-kontent-insert-position="start"
      >
        {resources.map((resource) => {
          const { id, elements, system } = resource
          return (
            <Resource
              key={id}
              data={elements}
              id={id}
              languageCode={languageCode}
              system={system}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Resources

export const query = graphql`
  fragment resources on kontent_item_resources {
    elements {
      resources {
        value {
          ...resource
          system {
            id
            codename
          }
        }
      }
    }
  }
`
