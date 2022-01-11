import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableBasic = ({ data, footnote, id, code }) => {
  return (
    <>
      <div className="col-md-12" data-kontent-item-id={id}>
        <div className="basic" data-kontent-element-codename={code}>
          <RichTextElement value={data} />
          <div className="basic__footnote" data-kontent-element-codename={code}>
            <RichTextElement value={footnote} />
          </div>
        </div>
      </div>
    </>
  )
}
export default TableBasic
