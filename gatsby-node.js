require('dotenv').config()

const path = require('path')
const axios = require('axios')
const { convert } = require('html-to-text')

const htmlToText = (html) => {
  return convert(html)
}

const handlePagesSearchData = (result) => {
  const {
    data: { item, modular_content },
  } = result
  // STEP 1: KEYS FROM ELEMENTS
  const introKey = item.elements.intro.value[0]
  const bodyKeys = item.elements.body.value
  const referencesKeys = item.elements.references.value
  // STEP 2: BASED ON KEYS, FETCH DATA FROM MODULAR_CONTENT
  const introData = modular_content[introKey]
  if (!introData) {
    return []
  }
  const nameOfContentItem = item.elements?.title?.value || item.system?.name
  // STEP 3: GET DATA
  const pageSearchData = [
    {
      id: item.system.id,
      code: item.system.codename,
      name: nameOfContentItem,
      type: item.system.type,
      title: introData?.elements?.title?.value,
      subtitle: introData?.elements?.subtitle?.value,
      body: htmlToText(introData?.elements?.description?.value),
      url: item.elements.url?.value,
    },
  ]
  for (const bodyKey of bodyKeys) {
    const keyData = modular_content[bodyKey]
    // ------------------------------------------- CASE - INFO BLOCK -------------------------------------------
    if (keyData.system.type === 'info_block') {
      pageSearchData.push({
        id: keyData.system.id,
        code: keyData.system.codename,
        name: nameOfContentItem,
        type: keyData.system.type,
        title: introData?.elements?.title?.value,
        body: htmlToText(keyData?.elements?.content?.value),
        url: item.elements.url?.value,
      })

      for (const iterator of keyData?.elements?.content?.modular_content) {
        const contentItem = modular_content[iterator]
        // ------------------------------------------- CASE - CARDS -------------------------------------------
        if (contentItem && contentItem.system.type === 'cards') {
          // cards can have multiple card
          const cards = contentItem.elements.cards.value
          for (const card of cards) {
            const cardData = modular_content[card]
            pageSearchData.push({
              id: cardData.system.id,
              code: cardData.system.codename,
              name: nameOfContentItem,
              type: cardData.system.type,
              title: cardData.elements?.title?.value,
              body: htmlToText(cardData?.elements?.details?.value),
              url: item.elements.url?.value,
            })
          }
        }
        // ------------------------------------------- CASE - INFOGRAPHICS -------------------------------------------
        if (contentItem && contentItem.system.type === 'infographics') {
          // cards can have multiple card
          const infographics = contentItem.elements.infographics.value
          for (const infographic of infographics) {
            const infographicData = modular_content[infographic]
            pageSearchData.push({
              id: infographicData.system.id,
              code: infographicData.system.codename,
              name: nameOfContentItem,
              type: infographicData.system.type,
              title: htmlToText(infographicData.elements?.title?.value),
              body: htmlToText(infographicData?.elements?.footnote?.value),
              url: item.elements.url?.value,
            })
          }
        }
      }
    }
  }
  for (const referencesKey of referencesKeys) {
    const referencesData = modular_content[referencesKey]
    pageSearchData.push({
      id: referencesData.system.id,
      code: referencesData.system.codename,
      name: nameOfContentItem,
      title: introData?.elements?.title?.value,
      type: referencesData.system.type,
      body: htmlToText(referencesData?.elements?.references?.value),
      url: item.elements.url?.value,
    })
  }
  return pageSearchData
}
const handleEventsSearchData = (result) => {
  const {
    data: { item, modular_content },
  } = result
  const eventName =
    item.elements?.seo__title?.value ||
    item.system?.name ||
    item.elements?.title?.value
  const events = item.elements.events.value
  const eventsSearchData = [
    {
      id: item.system.id,
      code: item.system.codename,
      name: eventName,
      type: item.system.type,
      title: item.elements.title?.value,
      url: item.elements.seo__slug?.value,
    },
  ]
  for (const event of events) {
    const data = modular_content[event]
    eventsSearchData.push({
      id: data.system.id,
      code: data.system.codename,
      name: eventName,
      type: data.system.type,
      title: data.elements.title.value,
      body: data.elements.description.value,
      url: item.elements.seo__slug?.value,
    })
  }
  return eventsSearchData
}
const handleResourcesSearchData = (result) => {
  const {
    data: { item, modular_content },
  } = result
  // STEP 1: KEYS FROM ELEMENTS
  const bodyKey = item.elements.body.value
  const resourcesKey = item.elements.resources.value
  // STEP 2: BASED ON KEYS, FETCH DATA FROM MODULAR_CONTENT
  const bodyData = modular_content[bodyKey]
  const resourcesData = modular_content[resourcesKey]
  // STEP 3: GET DATA
  const introBlock = bodyData.elements.content.value
  const resources = resourcesData.elements.resources.value
  const resourceName = item.elements?.title?.value || item.system?.name
  const resourcesSearchData = [
    {
      id: item.system.id,
      code: item.system.codename,
      name: resourceName,
      type: item.system.type,
      title: item.elements.title?.value,
      body: htmlToText(introBlock),
      url: item.elements.url?.value,
    },
  ]
  for (const resource of resources) {
    const data = modular_content[resource]
    resourcesSearchData.push({
      id: data.system.id,
      code: data.system.codename,
      name: resourceName,
      type: data.system.type,
      title: data.elements.title.value,
      body: data.elements.description.value,
      url: item.elements.url?.value,
    })
  }
  return resourcesSearchData
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      pages: allKontentItemSite {
        nodes {
          elements {
            subpages {
              value {
                ... on kontent_item_page {
                  system {
                    id
                    codename
                    language
                    type
                  }
                  elements {
                    url {
                      value
                    }
                    title {
                      value
                    }
                    show_in_navigation {
                      value {
                        name
                      }
                    }
                  }
                }
                ... on kontent_item_event_landing {
                  system {
                    id
                    codename
                    language
                    type
                  }
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
          }
        }
      }
    }
  `)

  let languages = []

  data.pages.nodes.forEach((node) => {
    const {
      subpages: { value: subpages },
    } = node.elements
    subpages.forEach((page) => {
      if (!page.system) return
      const {
        system: { id: pageID, codename, type, language },
      } = page

      // maintain the languages
      languages.push(language)

      let pageTemplatePath = ''
      if (type === 'event_landing') {
        pageTemplatePath = './src/templates/event-landing-template.js'
      } else {
        pageTemplatePath = './src/templates/page-template.js'
      }
      const pageSlug = page.elements.url
        ? page.elements.url.value === 'heart-failure-and-tr'
          ? ''
          : page.elements.url.value
              .replace(/^\/+|\/+$/g, '')
              .toLowerCase()
              .trim()
        : page.elements.seo__slug?.value
            .replace(/^\/+|\/+$/g, '')
            .toLowerCase()
            .trim()

      const regionalPath = language !== 'en' ? `/${language}` : ''
      const path = `${regionalPath}/${pageSlug}`
      const pageTitle = page.elements.title
        ? page.elements.title.value.trim()
        : page.elements.seo__title?.value.trim()

      createPage({
        path: path,
        component: require.resolve(`${pageTemplatePath}`),
        context: {
          languageCode: language,
          pageID,
          pageTitle,
          pageSlug,
          codename,
        },
      })
      if (process.env.ENVIRONMENT === 'development') {
        const spotlightlightslug = page.elements.url
          ? page.elements.url.value
              .replace(/^\/+|\/+$/g, '')
              .toLowerCase()
              .trim()
          : page.elements.seo__slug?.value
              .replace(/^\/+|\/+$/g, '')
              .toLowerCase()
              .trim()
        const webspotlightPath = `/preview/${language}/${spotlightlightslug}`
        createPage({
          path: webspotlightPath,
          component: require.resolve(`${pageTemplatePath}`),
          context: { languageCode: language, pageID, pageTitle, codename },
        })
      }
    })
  })

  if (languages && languages.length > 0) {
    // remove duplicates
    languages = languages.filter((a, b) => languages.indexOf(a) === b)
    for (const language of languages) {
      // console.log('------------OUTER')
      // console.log(`${process.env.GATSBY_DELIVERY_API_URL}/${process.env.GATSBY_KONTENT_PROJECT_ID}/items?system.type[in]=page,event_landing&elements=title,url&language=${language}`);
      const searchableContent = await axios.get(
        `${process.env.GATSBY_DELIVERY_API_URL}/${process.env.GATSBY_KONTENT_PROJECT_ID}/items?system.type[in]=page,event_landing&elements=title,url&language=${language}`
      )
      const {
        data: { items },
      } = searchableContent
      let searchableData = []
      for (const item of items) {
        // console.log('---------------------------INNER')
        // console.log(`${process.env.GATSBY_DELIVERY_API_URL}/${process.env.GATSBY_KONTENT_PROJECT_ID}/items/${item.system.codename}?depth=2&language=${language}`)
        const result = await axios.get(
          `${process.env.GATSBY_DELIVERY_API_URL}/${process.env.GATSBY_KONTENT_PROJECT_ID}/items/${item.system.codename}?depth=2&language=${language}`
        )
        if (item.system.type === 'event_landing') {
          searchableData = searchableData.concat(handleEventsSearchData(result))
        }
        if (
          item.system.type === 'page' &&
          item.system.codename === 'resources'
        ) {
          searchableData = searchableData.concat(
            handleResourcesSearchData(result)
          )
        }
        if (
          item.system.type === 'page' &&
          item.system.codename !== 'resources'
        ) {
          searchableData = searchableData.concat(handlePagesSearchData(result))
        }
      }

      createPage({
        path: language === 'en' ? '/search' : `/${language}/search`,
        component: path.resolve(`./src/templates/client-search-template.js`),
        context: {
          languageCode: language,
          searchData: {
            data: searchableData, // prepareSearchData(result),
            options: {
              indexStrategy: 'Prefix match',
              searchSanitizer: 'Lower Case',
              SearchByTerm: true,
            },
          },
        },
      })

      createPage({
        path: language === 'en' ? '/sitemap' : `/${language}/sitemap`,
        component: path.resolve(`./src/templates/site-map-template.js`),
        context: { languageCode: language },
      })
      if (process.env.ENVIRONMENT === 'development') {
        createPage({
          path: `/preview/${language}/sitemap`,
          component: path.resolve(`./src/templates/site-map-template.js`),
          context: { languageCode: language },
        })
      }
    }
  }
}
