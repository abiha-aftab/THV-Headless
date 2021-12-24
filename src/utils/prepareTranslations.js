export const prepareTranslations = (translation, key) => {
  console.log('translation', translation)
  if (translation && key) {
    let item = translation.find((x) => x.key === key)
    if (item) item = JSON.parse(item?.value)
    console.log(item)
    return item
  }
}
