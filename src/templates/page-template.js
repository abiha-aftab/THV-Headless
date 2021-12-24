import React from 'react'
import { graphql, Link } from 'gatsby'
import Intro from '../containers/Intro'
import References from '../components/References'
import Resources from '../containers/Resources'
import DynamicZone from '../containers/DynamicZone'
import Layout from '../components/Layout'
import { prepareNavLinks } from '../utils/prepareNavLinks'
import { prepareTranslations } from '../utils/prepareTranslations'
import Steps from '../components/Steps'
import Orders from '../containers/Orders'
import FormCheckout from '../components/Form/variants/FormCheckout'
import OrderCheckout from '../components/Order/variants/OrderCheckout'
import { FaChevronRight } from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'

export default function PageTemplate({
  pageContext: { languageCode, pageID, pageTitle, codename },
  data,
}) {
  const { state } = useTheme()
  const basketCodenames = ['basket', 'warenkorb']
  const {
    pages,
    page: {
      elements: {
        intro: { value: intro },
        references: { value: references },
        body: { value: sections },
        resources: { value: resources },
      },
    },
    footer,
  } = data
  const navLinks = prepareNavLinks(pages, languageCode)

  let key = 'Basket'
  let translatedItems
  if (state.translations.length) {
    translatedItems = prepareTranslations(state.translations, key)
  }
  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      {(basketCodenames.indexOf(codename) !== -1 ||
        codename.indexOf('checkout') !== -1) && (
        <section className="section pb-0 container">
          <h1>{pageTitle}</h1>
        </section>
      )}
      {intro.length !== 0 && <Intro data={intro} />}
      {sections.length !== 0 && <DynamicZone data={sections} />}
      {references.length !== 0 && <References data={references} />}
      {resources.length !== 0 && <Resources data={resources} />}
      {basketCodenames.indexOf(codename) !== -1 && (
        <>
          <Steps step={1} />
          <Orders languageCode={languageCode} />
        </>
      )}
      {codename.indexOf('checkout') !== -1 && (
        <>
          <Steps step={2} />
          <section className="section">
            <div className="container">
              <div className="grid-md-12">
                <div className="col-md-8">
                  <h3>Delivery details</h3>
                  <FormCheckout />
                </div>
                <div className="col-md-4">
                  <h3>My order(s)</h3>
                  <strong>
                    <Link
                      className="btn-ghost"
                      to={
                        languageCode === 'en'
                          ? `/${translatedItems.Title}`
                          : `/${languageCode}/warenkorb`
                      }
                    >
                      Edit selection <FaChevronRight className="ml-50" />
                    </Link>
                  </strong>
                  {state.orders.map((order) => {
                    return <OrderCheckout key={order.id} data={order} />
                  })}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  )
}

export const query = graphql`
  query pageQuery($pageID: String, $languageCode: String) {
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
    page: kontentItemPage(
      system: { id: { eq: $pageID }, language: { eq: $languageCode } }
    ) {
      elements {
        intro {
          value {
            ...intro
          }
        }
        references {
          value {
            ...references
          }
        }
        body {
          value {
            ...call_to_action
            ...info_block
            system {
              type
              id
              name
            }
          }
        }
        resources {
          value {
            ...resources
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
