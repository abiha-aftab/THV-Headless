import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableGrading = ({ data, footnote }) => {
  return (
    <>
      <div className="col-md-12">
        <div className="grading">
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
