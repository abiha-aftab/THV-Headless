import React from "react"
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import { prepareNavLinks } from '../utils/prepareNavLinks'
import { DEFAULT_LANGUAGE } from '../utils/constants'
import { getTitlePart } from '../utils/helpers'
import SEO from "../components/SEO"

const getUrl = (languageCode, url) => {
  if (languageCode === DEFAULT_LANGUAGE) {
    if (url === '/') {
      return '/';
    } else {
      return `/${url}/`;
    }
  }

  if (url === '/') {
    return `/${languageCode}/`;
  } else {
    return `/${languageCode}/${url}/`;
  }
};

const siteMapTemplate = ({ pageContext: { languageCode, path }, data }) => {
  const {
    pages,
    siteMap: {
      nodes: links
    },
    footer
  } = data;

  const navLinks = prepareNavLinks(pages, languageCode)
  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      <SEO title={`Sitemap - ${getTitlePart(languageCode)}`} />
      <div className="section">
        <div className="container">
          <div className="siteMap">
            <div>
              <h1>Sitemap</h1>
            </div>
            <div className="grid-md-5">
              {
                links.map((link, index) => {
                  const {
                    system: { name, type },
                    elements
                  } = link;
                  const url = elements.url?.value || elements.seo__slug?.value;
                  return (elements.show_in_navigation?.value[0]?.codename === "yes" || type === "event_landing") &&
                    <h3 key={index}>
                      <Link to={getUrl(languageCode, url)}> {elements.title?.value || elements.seo__title?.value || name}</Link>
                    </h3>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default siteMapTemplate;

export const query = graphql`
query siteMapQuery($languageCode: String) {
  pages: kontentItemSite(system: { language: { eq: $languageCode } }) {
    elements {
      subpages {
        value {
          ...page
          ...page_event_landing
        }
      }
    }
  }
  siteMap: allKontentItem(
    filter: {system: {type: {in: ["event_landing", "page"]}, language: {eq: $languageCode}}}
  ) {
    nodes {
      system {
        name
        type
      }
      ... on kontent_item_page {
        elements {
          title {
            value
          }
          url {
            value
          }
          show_in_navigation {
            value {
              codename
            }
          }
        }
      }
      ... on kontent_item_event_landing {
        elements {
          seo__title {
            value
          }
          seo__slug {
            value
          }
        }
      }
    }
  }
  footer: kontentItemFooter(system: { language: { eq: $languageCode } }) {
    system {
      id
      codename
    }
    elements {
      social_sharing__text {
        value
      }
      social_sharing__sources {
        value {
          codename
          name
        }
      }
      external_links {
        value {
          ...link
        }
      }
      disclaimer {
        value
      }
      copyright {
        value
      }
      address {
        value
      }
    }
  }
  }
`