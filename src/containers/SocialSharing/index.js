import React, { useState } from 'react'
import { RiShareLine, RiFacebookCircleFill, RiLinkedinBoxFill, RiTwitterFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { useLocation } from '@reach/router'

const SocialSharing = ({ locale, pageTitle, pageSlug, label, text, sources, mailto }) => {
  const { origin, pathname } = useLocation()
  const path = `${origin}${pathname}`
  const [showOptions, setShowOptions] = useState(false)
  const handleShowOptions = () => {
    setShowOptions(!showOptions)
  }
  let email = mailto
  email = email.replace('[title]', pageTitle)
  email = email.replace('[slug]', locale !== 'en' ? `${locale}%2F${pageSlug}` : pageSlug)

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
                    <button key={key} onClick={() => window.open(`${source.name}${path}`, '_blank', 'share')} rel="noreferrer" className="socialSharing__list-item">
                      <span className="d-none">{source.codename}</span>
                      {source.codename === 'facebook' && <RiFacebookCircleFill/>}
                      {source.codename === 'twitter' && <RiTwitterFill/>}
                      {source.codename === 'linkedin' && <RiLinkedinBoxFill/>}
                    </button>
                  )
                })
              }
              <a href={email} className="socialSharing__list-item">
                <span className="d-none">mail</span>
                <MdEmail/>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialSharing
