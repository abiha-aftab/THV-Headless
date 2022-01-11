import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { RiFacebookCircleFill, RiTwitterFill, RiLinkedinBoxFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { prepareExternalLinks } from '../../../../utils/prepareExternalLinks'
import ScrollToTop from './ScrollToTop'
import NavLinks from './NavLinks'
import { useLocation } from '@reach/router'
import { DEFAULT_LANGUAGE } from '../../../../utils/constants'

const FooterDefault = ({ navLinks, footer, languageCode = DEFAULT_LANGUAGE }) => {
  const { origin, pathname } = useLocation()
  const path = `${origin}${pathname}`
  const { social_sharing__text, social_sharing__sources, social_sharing__mailto, external_links, disclaimer, copyright, address } = footer.elements
  if(external_links && external_links.value.length > 0) {
    navLinks = prepareExternalLinks(external_links.value, navLinks)
  }
  let fixURL = languageCode !== 'en' ? `%2F${languageCode}` : ''
  let email = `${social_sharing__mailto.value}${fixURL}`
  return (
    <div className="footerDefault section">
      <ScrollToTop/>
      <div className="container">
        <div className="footerDefault__navigations">
          {social_sharing__text &&
            <p>{social_sharing__text.value}</p>
          }
          <div className="grid-md-12">
            <div className="col-md-3">
              <div className="footerDefault__navigation-social">
                {
                  social_sharing__sources.value.map((source, key) => {
                    return (
                      <button key={key} onClick={() => window.open(`${source.name}${path}`, '_blank', 'share')} rel="noreferrer" className="icon">
                        <span className="d-none">{source.codename}</span>
                        {source.codename === 'facebook' && <RiFacebookCircleFill/>}
                        {source.codename === 'twitter' && <RiTwitterFill/>}
                        {source.codename === 'linkedin' && <RiLinkedinBoxFill/>}
                      </button>
                    )
                  })
                }
                <a href={email} className="icon">
                  <span className="d-none">email</span>
                  <MdEmail/>
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <NavLinks navLinks={navLinks} />
            </div>
          </div>
        </div>
        <div className="footerDefault__text">
          {disclaimer &&
            <div className="footerDefault__text-disclaimer">
              <RichTextElement value={disclaimer.value} />
            </div>
          }
          {copyright &&
            <div className="footerDefault__text-copyright">
              <RichTextElement value={copyright.value} />
            </div>
          }
          {address &&
            <div className="footerDefault__text-address">
              <RichTextElement value={address.value} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default FooterDefault
