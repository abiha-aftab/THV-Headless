import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { ImageElement } from '@kentico/gatsby-kontent-components'
import { FaYoutube } from 'react-icons/fa'
import { ImYoutube2 } from 'react-icons/im'
import { StaticImage } from "gatsby-plugin-image"

const Video = ({ url, title, thumbnail = [] }) => {
  const [showVideo, setShowVideo] = useState(false)

  const handleShowVideo = () => {
    setShowVideo(true)
  }

  return (
    <div className="video">
      {showVideo
        ? (
          <iframe
            loading="lazy"
            className="video__frame"
            src={`https://www.youtube.com/embed/${url}?autoplay=1&mute=1`}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          />
          ) : (
          <div className="video__wrapper">
            {thumbnail.length > 0
              ? <ImageElement className="video__wrapper-image element" image={thumbnail[0]} alt={`${title} video thumbnail`}/>
              : <StaticImage className="video__wrapper-image gatsby" src={"./../../assets/images/placeholder.png"} alt={`${title} video thumbnail`} />
            }
            <button onClick={handleShowVideo} className="video__wrapper-btn"><FaYoutube/></button>
            <a href={`https://www.youtube.com/embed/${url}`} target="_blank" className="video__wrapper-banner"><span>Watch on <ImYoutube2/></span></a>
          </div>
        )
      }
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
      thumbnail {
        value {
          url
          width
          height
        }
      }
    }
  }
`
