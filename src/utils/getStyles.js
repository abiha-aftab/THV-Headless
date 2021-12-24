const getStyles = (data) => {
  const backgroundColor = data.backgroundColor.value.length
    ? 'bg-' + data.backgroundColor.value[0].codename.replace('_', '-')
    : ''
  const paddingTop = data.paddingTop.value.length
    ? 'pt-' + data.paddingTop.value[0].codename.replace('n', '')
    : ''
  const paddingBottom = data.paddingBottom.value.length
    ? 'pb-' + data.paddingBottom.value[0].codename.replace('n', '')
    : ''
  return { backgroundColor, paddingTop, paddingBottom }
}

export default getStyles
