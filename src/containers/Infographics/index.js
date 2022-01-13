import React from 'react'
import Infographic from '../../components/Infographic'
import { graphql } from 'gatsby'

const Infographics = ({ data }) => {
  const {
    title: { value: title },
    layout: { value: layoutType },
    infographics: { value: infographics },
  } = data

  return (
    <>
      {
        layoutType && layoutType.length === 0 && <div className="infographics">
          {infographics && infographics.map((infographic) => {
            const { elements, id, system } = infographic
            return <Infographic data={elements} key={id} system={system} className="infographics" />
          })}
        </div>
      }
      {layoutType && layoutType.length > 0 && layoutType[0].name === '2 columns' && <div className="infographicscol">
        {infographics && infographics.map((infographic) => {
          const { elements, id, system } = infographic
          return <div className="infographicscol__column">
            <Infographic data={elements} key={id} system={system} className="infographicscol" />
          </div >
        })
        }
      </div>
      }
    </>
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
      layout {
        value {
          name
        }
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
