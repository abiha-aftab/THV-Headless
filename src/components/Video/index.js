import { graphql } from 'gatsby'
import React from 'react'

const Video = ({ url, title }) => {
  return (
    <div className="video">
      <iframe
        className="video__frame"
        src={`https://www.youtube.com/embed/${url}`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    </div>
  )
}

export default Video

export const query = graphql`
  fragment video on kontent_item_video {
    elements {
      video_id {
        value
      }
    }
  }
`
