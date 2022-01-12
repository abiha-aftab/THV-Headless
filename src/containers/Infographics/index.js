import React from 'react'
import Infographic from '../../components/Infographic'
import { graphql } from 'gatsby'

const Infographics = ({ data }) => {
  const {
    title: { value: title },
    infographics: { value: infographics },
  } = data
  return (
    <div className="infographics">
      {infographics &&
        infographics.map((infographic) => {
          const { elements, id, system } = infographic
          return <Infographic data={elements} key={id} system={system} />
        })}
    </div>
  )
}
export default Infographics

export const query = graphql`
  fragment infographics on kontent_item_infographics {
    id
    elements {
      title {
        value
      }
      infographics {
        value {
          ...infographic
          system {
            id
            codename
          }
        }
      }
    }
  }
`
