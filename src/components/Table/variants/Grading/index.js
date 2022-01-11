import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableGrading = ({ data, footnote, id, code }) => {
  return (
    <>
      <div className="col-md-12" data-kontent-item-id={id}>
        <div className="grading" data-kontent-element-codename={code}>
          <RichTextElement value={data} />
          <div className="grading__footnote">
            <RichTextElement value={footnote} />
          </div>
        </div>
      </div>
    </>
  )
}
export default TableGrading
