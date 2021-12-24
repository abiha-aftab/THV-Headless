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
  } = data
  switch (variant) {
    case 'grading':
      return <TableGrading data={table} />
    case 'basic':
      return <TableBasic data={table} />
    case 'hoverable':
      return <TableHoverable data={table} />
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
    }
  }
`
