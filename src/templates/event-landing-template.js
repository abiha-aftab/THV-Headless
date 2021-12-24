import React from 'react'
import Events from '../components/Events'
import { graphql } from 'gatsby'
import Image from '../components/Image'
import MarketoForm from '../containers/MarketoForm'
import Layout from '../components/Layout'
import { prepareNavLinks } from '../utils/prepareNavLinks'

const events = ({
  pageContext: { languageCode, pageID, pageTitle, codename },
  data,
}) => {
  const {
    pages,
    kontentItemEventLanding: {
      elements: {
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
  const navLinks = prepareNavLinks(pages, languageCode)
  return (
    <Layout languageCode={languageCode} navLinks={navLinks} footerData={footer}>
      <section className="container-right grid-md-12 gap-4 m-section">
        <div className="col-md-7 mt-2 mt-md-5">
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
                <Events
                  key={title}
                  events={events}
                  title={title}
                  description={description}
                />
              )
            })}
          </div>
        </div>
        <div className="col-md-5 d-none d-md-block">
          <Image image={image} />
        </div>
      </section>
      <MarketoForm
        formTitle={formTitle}
        description={description}
        form_number={form_number}
      />
    </Layout>
  )
}

export default events

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
