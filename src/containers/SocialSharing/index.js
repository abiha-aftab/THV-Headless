import React, { useState } from 'react'
import { RiShareLine, RiFacebookCircleFill, RiLinkedinBoxFill, RiTwitterFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { useLocation } from '@reach/router'

const SocialSharing = ({ label, text, sources }) => {
  const { origin, pathname } = useLocation()
  const path = `${origin}${pathname}`
  const [showOptions, setShowOptions] = useState(false)
  const handleShowOptions = () => {
    setShowOptions(!showOptions)
  }

  return (
    <div className="socialSharing">
      <div className="socialSharing__content">
        <button className="socialSharing__label" onClick={handleShowOptions}>{label} <RiShareLine/></button>
        {showOptions && (
          <div className={`socialSharing__contain show`}>
            <p className="socialSharing__text">{text}</p>
            <div className="socialSharing__list">
            {
              sources.map((source, key) => {
                return (
                  source.codename !== 'mail'
                  ? (
                  <button key={key} onClick={() => window.open(`${source.name}${path}`, '_blank', 'share')} rel="noreferrer" className="socialSharing__list-item">
                    <span className="d-none">{source.codename}</span>
                    {source.codename === 'facebook' && <RiFacebookCircleFill/>}
                    {source.codename === 'twitter' && <RiTwitterFill/>}
                    {source.codename === 'linkedin' && <RiLinkedinBoxFill/>}
                  </button>
                  ) : (
                  <a key={key} href={source.name} target="_blank" rel="noreferrer" className="socialSharing__list-item">
                    <span className="d-none">{source.codename}</span>
                    {source.codename === 'mail' && <MdEmail/>}
                  </a>
                  )
                )
              })
            }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialSharing
