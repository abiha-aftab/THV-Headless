import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableHoverable = ({ data, footnote, id, code }) => {
  return (
    <>
      <div className="col-md-12" data-kontent-item-id={id}>
        <div className="hoverable" data-kontent-element-codename={code}>
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
