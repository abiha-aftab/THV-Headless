import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableHoverable = ({ data }) => {
  return (
    <>
      <div className="col-md-12">
        <div className="hoverable">
          <RichTextElement value={data} />
        </div>
      </div>
    </>
  )
}
export default TableHoverable
