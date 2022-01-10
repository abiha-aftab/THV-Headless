export const prepareTranslations = (translation, key) => {
  if (translation && key) {
    let item = translation.find((x) => x.key === key)
    if (item) item = JSON.parse(item?.value)
    return item
  }
}
