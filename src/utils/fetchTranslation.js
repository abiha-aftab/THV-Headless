import { useTheme } from '../hooks/useTheme'
import React, { useEffect, useState } from 'react'

const FetchTranslations = ({ language }) => {
  const { state, actions } = useTheme()
  const [translations, setTranslations] = useState([])

  useEffect(() => {
    fetch(
      `${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/items/translations?language=${language}`
    )
      .then((response) => response.json())
      .then((results) => {
        console.log('result is', results)
        const tmp = []
        let val = results.item.elements.translation.value.length
        for (let i = 0; i < val; i++) {
          const { elements, system } =
            results.modular_content[Object.keys(results.modular_content)[i]]
          tmp.push({
            key: system.name,
            value: elements.value.value,
          })
        }

        setTranslations(tmp)
        actions.changeTranslations(tmp)
      })
  }, [state.translations, actions, language])
}

export default FetchTranslations
