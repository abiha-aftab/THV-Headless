import React, { useState, useEffect, Suspense, lazy } from "react"
import { graphql } from 'gatsby'
import Image from '../components/Image'
import Layout from '../components/Layout'
import { prepareNavLinks } from '../utils/prepareNavLinks'
import SocialSharing from '../containers/SocialSharing'
import SEO from '../components/SEO'
import { useTheme } from '../hooks/useTheme'
import { getSelectedLanguage, getTitlePart } from "../utils/helpers"
const Events = lazy(() => import('../components/Events'))
const MarketoForm = lazy(() => import('../containers/MarketoForm'))

export default function EventsTemplate({
  pageContext: { languageCode, pageID, pageTitle, codename },
  data,
}) {
  const {
    pages,
    kontentItemEventLanding: {
      elements: {
        social_sharing__label: { value: socialLabel },
        social_sharing__text: { value: socialText },
        social_sharing__sources: { value: socialSources },
        title: { value: heading },
        events: { value: events },
        image: {
          value: [
            {
              elements: {
                image: {
                  value: [image],
                },
              },
            },
          ],
        },
        marketo_form: {
          value: [
            {
              elements: {
                form_number: { value: form_number },
                description: { value: description },
                title: { value: formTitle },
              },
            },
          ],
        },
      },
    },
    footer,
  } = data
  console.log(data)
  console.log(codename)

  const { state } = useTheme();
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const language = getSelectedLanguage(state);
    setTitle(`${pageTitle} - ${getTitlePart(languageCode)} ${language.region}`);
  }, [])

  const navLinks = prepareNavLinks(pages, languageCode)
  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      {title && <SEO title={title} />}
      <section className="container-right grid-md-12 gap-4 m-section events-section">
        <div className="col-md-7 mt-2 mt-md-5">
          {socialSources.length > 0 && <SocialSharing label={socialLabel} text={socialText} sources={socialSources} />}
          <h1>{heading}</h1>
          <div className="events">
            {events.map((event) => {
              const {
                elements: {
                  title: { value: title },
                  events: { value: events },
                  description: { value: description },
                },
              } = event
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <Events
                    key={title}
                    events={events}
                    title={title}
                    description={description}
                  />
                </Suspense>
              )
            })}
          </div>
        </div>
        <div className="col-md-5 d-none d-md-block">
          <Image image={image} />
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <MarketoForm
          formTitle={formTitle}
          description={description}
          form_number={form_number}
        />
      </Suspense>
    </Layout>
  )
}

export const query = graphql`
  query eventsQuery($languageCode: String) {
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
    kontentItemEventLanding(system: { language: { eq: $languageCode } }) {
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
        marketo_form {
          value {
            ...marketoForm
          }
        }
        title {
          value
        }
        image {
          value {
            ...image
          }
        }
        events {
          value {
            ...events
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
