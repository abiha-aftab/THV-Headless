import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableHoverable = ({ data, footnote }) => {
  return (
    <>
      <div className="col-md-12">
        <div className="hoverable">
          <RichTextElement value={data} />
          <div className="hoverable__footnote">
            <RichTextElement value={footnote} />
          </div>
        </div>
      </div>
    </>
  )
}
export default TableHoverable
