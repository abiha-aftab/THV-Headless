import React from 'react'
import Card from '../../components/Card'
import { graphql } from 'gatsby'

const Cards = ({ data, code }) => {
  const {
    cards: { value: cards },
  } = data
  return (
    <>
      {cards && cards.length > 1 && (
        <div className={`gap-1 grid-md-${cards.length}`}>
          {cards &&
            cards.map((card) => {
              const { elements, id, system } = card
              return (
                <Card data={elements} key={id} system={system}>
                  Cards
                </Card>
              )
            })}
        </div>
      )}
      {cards && cards.length === 1 && (
        <div
          className="grid-md-12"
          data-kontent-component-id={code}
          data-kontent-add-button
          data-kontent-add-button-render-position="bottom"
          data-kontent-add-button-insert-position="after"
        >
          <div
            className="start-md-3 end-md-11"
            data-kontent-element-codename="cards"
          >
            {cards &&
              cards.map((card) => {
                const { elements, id, system } = card
                return (
                  <Card data={elements} key={id} system={system}>
                    Cards
                  </Card>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}
export default Cards

export const query = graphql`
  fragment cards on kontent_item_cards {
    id

    system {
      codename
      id
    }
    elements {
      cards {
        value {
          ...card
          system {
            id
            codename
          }
        }
      }
    }
  }
`
