import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const TableBasic = ({ data, footnote }) => {
  return (
    <>
      <div className="col-md-12">
        <div className="basic">
          <RichTextElement value={data} />
          <div className="basic__footnote">
            <RichTextElement value={footnote} />
          </div>
        </div>
      </div>
    </>
  )
}
export default TableBasic
