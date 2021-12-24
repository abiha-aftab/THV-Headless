export const prepareExternalLinks = (external_links, navLinks) => {
  const tmp = navLinks.filter(link => {return link.type === 'external'})
  if(tmp.length > 0)
    return navLinks
  let links = navLinks.length > 0 ? navLinks : []
  external_links.forEach((link) => {
    const {title: {value: title}, url: {value: url}} = link.elements
    links.push({
      title: title,
      url: url,
      type: 'external',
      show: true
    })
  })
  return links
}
