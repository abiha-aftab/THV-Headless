import React from 'react'
import TableGrading from './variants/Grading'
import TableBasic from './variants/Basic'
import TableHoverable from './variants/Hoverable'
import { graphql } from 'gatsby'

const Table = ({ data }) => {
  const {
    variant: {
      value: [{ codename: variant }],
    },
    table: { value: table },
    footnote: { value: footnote },
  } = data
  switch (variant) {
    case 'grading':
      return <TableGrading data={table} footnote={footnote} />
    case 'basic':
      return <TableBasic data={table} footnote={footnote} />
    case 'hoverable':
      return <TableHoverable data={table} footnote={footnote} />
    default:
      return null
  }
}

export default Table

export const query = graphql`
  fragment table on kontent_item_table {
    id
    elements {
      variant {
        value {
          codename
        }
      }
      table {
        value
      }
      footnote {
        value
      }
    }
  }
`
