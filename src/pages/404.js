import React, { useEffect, useState } from "react"
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { navigate } from 'gatsby';
import { prepareNavLinks } from '../utils/prepareNavLinks'
import { useTheme } from '../hooks/useTheme'
import getTranslationByKey from '../utils/getTranslation'
import { DEFAULT_LANGUAGE } from '../utils/constants'
import { getSelectedLanguage } from '../utils/helpers'
import SEO from '../components/SEO'

export default function NotFound({ data }) {
  const {
    pages,
    footer
  } = data;

  const { state } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Reaason for implementing this in hook: to avoid: ReferenceError: localStorage is not defined
    const language = getSelectedLanguage(state);
    setSelectedLanguage(language.name);
  }, [])

  const filteredPages = pages.nodes.filter((node) => node.system.language === selectedLanguage);
  const filteredFooter = footer.nodes.filter((node) => node.system.language === selectedLanguage);
  const navLinks = prepareNavLinks(filteredPages[0], selectedLanguage);

  let nfTranslation = null; // for not-found/404 translations
  let searchTranslation = null; // for the search input box translations - placeholder
  if (state && state.translations && state.translations.length > 0) {
    nfTranslation = getTranslationByKey('404', state.translations);
    searchTranslation = getTranslationByKey('Search', state.translations);
  }

  return (
    <Layout languageCode={selectedLanguage} navLinks={navLinks} footerData={filteredFooter[0]}>
      <SEO title="Not Found" />
      <div className="section pt-5">
        <div className="container">
          <div className="siteMap">
            {nfTranslation && <div>
              <h1>{nfTranslation.Title}</h1>
              <div>
                <p>{nfTranslation.Search}</p>
              </div>
            </div>}
            <div className="search">
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const value = e.target[0].value;
                  navigate(selectedLanguage === DEFAULT_LANGUAGE ? `/search?s=${value}` : `/${selectedLanguage}/search?s=${value}`);
                }}>
                  {searchTranslation && <input type="search" className="search__search_field"
                    id="Search"
                    placeholder={searchTranslation.Placeholder} />}
                </form>
              </div></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query notFoundQuery {
    pages: allKontentItemSite {
      nodes {
        system {
          language
        }
        elements {
          subpages {
            value {
              ...page
              ...page_event_landing
            }
          }
        }
      }
    }
    footer: allKontentItemFooter {
      nodes {
        elements {
          address {
            value
          }
          copyright {
            value
          }
          disclaimer {
            value
          }
          external_links {
            value {
              ... link
            }
          }
          social_sharing__label {
            value
          }
          social_sharing__sources {
            value {
              codename
              name
            }
          }
          social_sharing__mailto {
            value
          }
          social_sharing__text {
            value
          }
        }
        system {
          language
        }
      }
    }
  }
`
