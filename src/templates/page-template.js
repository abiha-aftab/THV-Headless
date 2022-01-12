import React, { useState, Suspense, lazy } from 'react'
import { graphql, Link } from 'gatsby'
import Intro from '../containers/Intro'
import References from '../components/References'
import Layout from '../components/Layout'
import { prepareNavLinks } from '../utils/prepareNavLinks'
import Steps from '../components/Steps'
import { FaChevronRight } from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'
import { prepareTranslations } from '../utils/prepareTranslations'
import { getTitleForGermanyHomePage } from '../utils/helpers'
import SEO from '../components/SEO'
const DynamicZone = lazy(() => import('../containers/DynamicZone'))
const Resources = lazy(() => import('../containers/Resources'))
const Orders = lazy(() => import('../containers/Orders'))
const FormCheckout = lazy(() =>
  import('../components/Form/variants/FormCheckout')
)
const OrderCheckout = lazy(() =>
  import('../components/Order/variants/OrderCheckout')
)

export default function PageTemplate({
  pageContext: { languageCode, pageID, pageTitle, pageSlug, codename },
  data,
}) {
  const { state } = useTheme()
  const [checkoutStep, setCheckoutStep] = useState(2)

  const handleChangeCheckoutStep = (step) => {
    setCheckoutStep(step)
  }
  console.log('basket', codename)
  let translatedItemCheckout = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
  }
  const basketCodenames = ['basket', 'warenkorb']
  const pagesWithTitle = [...basketCodenames, 'checkout', 'thank_you']
  const {
    pages,
    page: {
      elements: {
        social_sharing__label: { value: socialLabel },
        social_sharing__text: { value: socialText },
        social_sharing__sources: { value: socialSources },
        social_sharing__mailto: { value: mailto },
        intro: { value: intro },
        references: { value: references },
        body: { value: sections },
        resources: { value: resources },
      },
    },
    footer,
  } = data
  const socialSharing = {
    locale: languageCode,
    pageTitle: pageTitle,
    pageSlug: pageSlug,
    label: socialLabel,
    text: socialText,
    sources: socialSources,
    mailto: mailto,
  }

  const navLinks = prepareNavLinks(pages, languageCode)
  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      {pageTitle && (
        <SEO title={getTitleForGermanyHomePage(languageCode, pageTitle)} />
      )}
      {pagesWithTitle.indexOf(codename) !== -1 && (
        <section
          className="section pt-5 pb-0 container"
          data-kontent-item-id={pageID}
          data-kontent-element-codename={codename}
        >
          <h1>{pageTitle}</h1>
        </section>
      )}
      {intro.length !== 0 && (
        <Intro data={intro} socialSharing={socialSharing} />
      )}
      {sections.length !== 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicZone
            data={sections}
            socialSharing={intro.length === 0 ? socialSharing : null}
            languageCode={languageCode}
          />
        </Suspense>
      )}
      {references.length !== 0 && <References data={references} />}
      {resources.length !== 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Resources data={resources} languageCode={languageCode} />
        </Suspense>
      )}
      {basketCodenames.indexOf(codename) !== -1 && (
        <>
          <Steps step={1} />
          <Suspense fallback={<div>Loading...</div>}>
            <Orders languageCode={languageCode} />
          </Suspense>
        </>
      )}
      {codename.indexOf('checkout') !== -1 && (
        <>
          <Steps step={checkoutStep} />
          <section className="section">
            <div className="container">
              <div className="grid-md-12">
                <div className="col-md-8">
                  <h3>
                    {translatedItemCheckout?.DeliveryTitle
                      ? translatedItemCheckout?.DeliveryTitle
                      : 'Delivery details'}
                  </h3>
                  <Suspense fallback={<div>Loading...</div>}>
                    <FormCheckout
                      step={checkoutStep}
                      changeCheckoutStep={handleChangeCheckoutStep}
                      languageCode={languageCode}
                    />
                  </Suspense>
                </div>
                <div className="col-md-4">
                  <h3>
                    {translatedItemCheckout?.Orders
                      ? translatedItemCheckout?.Orders
                      : 'My order(s)'}
                  </h3>
                  <strong>
                    <Link
                      className="btn-ghost"
                      to={
                        languageCode === 'en'
                          ? `/basket`
                          : `/${languageCode}/warenkorb`
                      }
                      onClick={() => {
                        handleChangeCheckoutStep(1)
                      }}
                    >
                      {translatedItemCheckout?.Edit
                        ? translatedItemCheckout?.Edit
                        : 'Edit Selection'}
                      <FaChevronRight className="ml-50" />
                    </Link>
                  </strong>
                  {state.orders.map((order) => {
                    return (
                      order.locale === languageCode && (
                        <Suspense fallback={<div>Loading...</div>}>
                          <OrderCheckout key={order.id} data={order} />
                        </Suspense>
                      )
                    )
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
        social_sharing__label {
          value
        }
        social_sharing__text {
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
        intro {
          value {
            ...intro
          }
        }
        references {
          value {
            ...references
            system {
              id
              codename
            }
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
              codename
            }
          }
        }
        resources {
          value {
            ...resources
            system {
              id
              codename
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
        social_sharing__mailto {
          value
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
