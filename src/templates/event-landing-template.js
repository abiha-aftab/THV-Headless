import React, { useState, useEffect } from 'react'
import Events from '../components/Events'
import { graphql } from 'gatsby'
import Image from '../components/Image'
import MarketoForm from '../containers/MarketoForm'
import Layout from '../components/Layout'
import { prepareNavLinks } from '../utils/prepareNavLinks'
import SocialSharing from '../containers/SocialSharing'
import SEO from '../components/SEO'
import { useTheme } from '../hooks/useTheme'
import { getSelectedLanguage } from '../utils/helpers'
import { SITE_TITLE } from '../utils/constants'

export default function EventsTemplate({
  pageContext: { languageCode, pageID, pageTitle, pageSlug, codename },
  data,
}) {
  const {
    pages,
    kontentItemEventLanding: {
      elements: {
        social_sharing__label: { value: socialLabel },
        social_sharing__text: { value: socialText },
        social_sharing__sources: { value: socialSources },
        social_sharing__mailto: { value: mailto },
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
              system: { id: marketoId, codename: marketoCodename },
            },
          ],
        },
      },
    },
    footer,
  } = data
  const { state } = useTheme()
  const [title, setTitle] = useState(null)

  useEffect(() => {
    const language = getSelectedLanguage(state)
    setTitle(`${pageTitle} - ${SITE_TITLE} ${language.region}`)
  }, [])

  const navLinks = prepareNavLinks(pages, languageCode)
  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      {title && <SEO title={title} />}
      <section className="container-right grid-md-12 gap-4 m-section events-section">
        <div className="col-md-7 mt-2 mt-md-5">
          {socialSources.length > 0 && (
            <SocialSharing
              locale={languageCode}
              pageTitle={pageTitle}
              pageSlug={pageSlug}
              label={socialLabel}
              text={socialText}
              sources={socialSources}
              mailto={mailto}
            />
          )}
          <h1
            data-kontent-item-id={pageID}
            data-kontent-element-codename={codename}
          >
            {heading}
          </h1>
          <div
            className="events"
            data-kontent-item-id={pageID}
            data-kontent-element-codename="events"
            data-kontent-add-button
            data-kontent-add-button-render-position="bottom"
            data-kontent-add-button-insert-position="after"
          >
            {events.map((event) => {
              const {
                elements: {
                  title: { value: title },
                  events: { value: events },
                  description: { value: description },
                },
                system: { id, codename },
              } = event
              return (
                <Events
                  key={title}
                  events={events}
                  title={title}
                  description={description}
                  id={id}
                  codename={codename}
                />
              )
            })}
          </div>
        </div>
        <div
          className="col-md-5 d-none d-md-block"
          data-kontent-item-id={pageID}
          data-kontent-element-codename={codename}
        >
          <Image image={image} />
        </div>
      </section>
      <MarketoForm
        formTitle={formTitle}
        description={description}
        form_number={form_number}
        id={marketoId}
        codename={marketoCodename}
      />
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
        social_sharing__mailto {
          value
        }
        marketo_form {
          value {
            ...marketoForm
            system {
              id
              codename
            }
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
