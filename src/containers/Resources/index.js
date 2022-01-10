import { graphql } from 'gatsby'
import React from 'react'
import Resource from '../../components/Resource'

const Resources = ({ data, languageCode = 'en' }) => {
  const [
    {
      elements: {
        resources: { value: resources },
      },
    },
  ] = data
  return (
    <section className="section bg-steel">
      <div className="container gap-2 grid-1 grid-md-3">
        {resources.map((resource) => {
          const { id, elements } = resource
          return <Resource key={id} data={elements} id={id} languageCode={languageCode} />
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
        }
      }
    }
  }
`
