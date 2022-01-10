import React from 'react'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { RiFacebookCircleFill, RiTwitterFill, RiLinkedinBoxFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { prepareExternalLinks } from '../../../../utils/prepareExternalLinks'
import ScrollToTop from './ScrollToTop'
import NavLinks from './NavLinks'
import { useLocation } from '@reach/router'

const FooterDefault = ({ navLinks, footer }) => {
  const { origin, pathname } = useLocation()
  const path = `${origin}${pathname}`
  const { social_sharing__text, social_sharing__sources, external_links, disclaimer, copyright, address } = footer.elements
  if(external_links && external_links.value.length > 0) {
    navLinks = prepareExternalLinks(external_links.value, navLinks)
  }
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
                    source.codename !== 'mail'
                    ? (
                      <button key={key} onClick={() => window.open(`${source.name}${path}`, '_blank', 'share')} rel="noreferrer" className="icon">
                        <span className="d-none">{source.codename}</span>
                        {source.codename === 'facebook' && <RiFacebookCircleFill/>}
                        {source.codename === 'twitter' && <RiTwitterFill/>}
                        {source.codename === 'linkedin' && <RiLinkedinBoxFill/>}
                      </button>
                    ) : (
                      <a key={key} href={source.name} target="_blank" rel="noreferrer" className="icon">
                        <span className="d-none">{source.codename}</span>
                        {source.codename === 'mail' && <MdEmail/>}
                      </a>
                    )
                  )
                })
              }
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
