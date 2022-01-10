import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ClientSearch from "../components/Search"
import { prepareNavLinks } from '../utils/prepareNavLinks'
import { useTheme } from '../hooks/useTheme'
import getTranslationByKey from '../utils/getTranslation'
import SEO from "../components/SEO"
import { getSelectedLanguage } from "../utils/helpers"
import { DEFAULT_LANGUAGE, SITE_TITLE_DEFAULT, SITE_TITLE_OTHERS } from "../utils/constants"

export default function SearchTemplate({ pageContext, data }) {
  const { searchData, languageCode } = pageContext;
  const {
    pages,
    footer
  } = data;

  const { state } = useTheme();
  const navLinks = prepareNavLinks(pages, languageCode)

  let searchTranslation = null;
  if (state && state.translations && state.translations.length > 0) {
    searchTranslation = getTranslationByKey('Search', state.translations);
  }

  const [pageTitle, setPageTitle] = useState(null);
  // Treating HF Valve ${language.region}
  useEffect(() => {
    const language = getSelectedLanguage(state);
    const search = window.location.search;
    const params = search && new URLSearchParams(search);
    const searchParam = params && params.get('s');
    let title = '';
    if (searchParam) {
      if (language.name === DEFAULT_LANGUAGE) {
        title = `You searched for ${searchParam} - ${SITE_TITLE_DEFAULT}`
      } else {
        title = `You searched for ${searchParam} - ${SITE_TITLE_OTHERS} ${language.region}`
      }
    } else {
      title = "Search - Treating HF Valve";
    }
    setPageTitle(title);
  }, [])

  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      {pageTitle && <SEO title={pageTitle} />}
      <div className="section">
        <ClientSearch
          data={searchData.data}
          language={languageCode}
          engine={searchData.options}
          translation={searchTranslation} />
      </div>
    </Layout>
  )
}

export const query = graphql`
query searchPageQuery($languageCode: String) {
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