import React from 'react'
import Card from '../../components/Card'
import { graphql } from 'gatsby'

const Cards = ({ data }) => {
  const {
    cards: { value: cards },
  } = data
  return (
    <>
      {
        cards && cards.length > 1 &&
        <div className={`gap-1 grid-md-${cards.length}`}>
          {cards && cards.map((card) => {
            const { elements, id } = card
            return <Card data={elements} key={id}>Cards</Card>
          })}
        </div>
      }
      {
        cards && cards.length === 1 &&
        <div className="grid-md-12">
          <div className="start-md-3 end-md-11">
            {cards && cards.map((card) => {
              const { elements, id } = card
              return <Card data={elements} key={id}>Cards</Card>
            })}
          </div>
        </div>
      }
    </>
  )
}
export default Cards

export const query = graphql`
  fragment cards on kontent_item_cards {
    id
    elements {
      cards {
        value {
          ...card
        }
      }
    }
  }
`
