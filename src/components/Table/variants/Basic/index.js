import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableBasic = ({ data }) => {
  return (
    <>
      <div className="col-md-12">
        <div className="basic">
          <RichTextElement value={data} />
        </div>
      </div>
    </>
  )
}
export default TableBasic
