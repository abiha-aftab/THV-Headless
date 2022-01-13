export const prepareNavLinks = (pages) => {
  const {
    subpages: { value: subpages },
  } = pages.elements
  const navLinks = []
  subpages.forEach((page) => {
    if (!page.system) return
    const {
      system: { language, type },
    } = page
    const showInNavigation = !(
      type !== 'event_landing' &&
      page.elements.show_in_navigation.value[0].name.toLowerCase() === 'no'
    )
    const pageSlug = page.elements.url
      ? page.elements.url.value
          .replace(/^\/+|\/+$/g, '')
          .toLowerCase()
          .trim()
      : page.elements.seo__slug?.value
          .replace(/^\/+|\/+$/g, '')
          .toLowerCase()
          .trim()
    const regionalPath = language !== 'en' ? `/${language}` : ''
    let path = `${regionalPath}/${pageSlug}`
    if (
      pageSlug === 'heart-failure-and-tr' ||
      pageSlug === 'herzinsuffizienz-und-ti'
    )
      path = '/'

    const pageTitle = page.elements.title
      ? page.elements.title.value.trim()
      : page.elements.seo__title?.value.trim()
    navLinks.push({
      title: pageTitle,
      url: path,
      type: 'page',
      show: showInNavigation,
    })
  })
  return navLinks
}
