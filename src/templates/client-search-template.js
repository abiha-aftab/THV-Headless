import React from "react"
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ClientSearch from "../components/Search"
import { prepareNavLinks } from '../utils/prepareNavLinks'

const searchTemplate = ({ pageContext, data }) => {
  const { searchData, languageCode } = pageContext;
  const {
    pages,
    search: {
      nodes: [search]
    },
    footer
  } = data;

  const navLinks = prepareNavLinks(pages, languageCode)

  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      <div class="section">
        <ClientSearch
          search={search}
          data={searchData.data}
          language={languageCode}
          engine={searchData.options} />
      </div>
    </Layout>
  )
}

export default searchTemplate;


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
  search: allKontentItemSearch(filter: {system: {language: {eq: $languageCode}}}) {
    nodes {
      elements {
        for {
          value
        }
        notfound {
          value
        }
        of {
          value
        }
        results {
          value
        }
        title {
          value
        }
        placeholder {
          value
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