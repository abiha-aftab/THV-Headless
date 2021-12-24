export const fetchTranslation = (language) => {
  console.log('hello')
  const tmp = []
  fetch(
    `${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/items/translations?language=${language}`
  )
    .then((response) => response.json())
    .then((results) => {
      console.log('result is', results)
      let val = results.item.elements.translation.value.length
      for (let i = 0; i < val; i++) {
        const { elements, system } =
          results.modular_content[Object.keys(results.modular_content)[i]]
        tmp.push({
          key: system.name,
          value: elements.value.value,
        })
      }
    })
  console.log('tmp', tmp)
  return tmp
}
