import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableGrading = ({ data }) => {
  return (
    <>
      <div className="col-md-12">
        <div className="grading">
          <RichTextElement value={data} />
        </div>
      </div>
    </>
  )
}
export default TableGrading
