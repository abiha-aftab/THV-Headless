import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { stripScripts } from '../../utils/stripScripts'

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { site, scripts } = useStaticQuery(query)

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    trustArc,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    trustArc: `${trustArc}`
  }

  const { head_scripts, body_scripts, trust_arc } = scripts.elements
  const headScripts = stripScripts(head_scripts.value)
  const bodyScripts = stripScripts(body_scripts.value)

  return (
    <>
      <Helmet title={seo.title}>
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />

        {seo.url && <meta property="og:url" content={seo.url} />}

        {(article ? true : null) && <meta property="og:type" content="article" />}

        {seo.title && <meta property="og:title" content={seo.title} />}

        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}

        {seo.image && <meta property="og:image" content={seo.image} />}

        <meta name="twitter:card" content="summary_large_image" />

        {twitterUsername && (
          <meta name="twitter:creator" content={twitterUsername} />
        )}

        {seo.title && <meta name="twitter:title" content={seo.title} />}

        {seo.description && (
          <meta name="twitter:description" content={seo.description} />
        )}

        {seo.image && <meta name="twitter:image" content={seo.image} />}
      </Helmet>
      {trust_arc && trust_arc.value && <Helmet script={[{ src: trust_arc.value, defer: true }]} />}
      {headScripts && headScripts.length > 0 && <Helmet script={headScripts} />}
      {bodyScripts && bodyScripts.length > 0 && bodyScripts.map((script, key) => {
        return (
          <noscript key={key}>{script.innerHTML}</noscript>
        )
      })
      }
    </>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
        trustArc
      }
    }
    scripts: kontentItemSite {
      elements {
        body_scripts {
          value
        }
        head_scripts {
          value
        }
        trust_arc {
          value
        }
      }
    }
  }
`
