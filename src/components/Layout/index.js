import React, { useEffect, useState } from 'react'
import '../../assets/scss/main.scss'
import FooterDefault from '../../containers/Footer/variants/FooterDefault'
import NavbarDefault from '../../containers/Navbar/variants/NavbarDefault'
import { useTheme } from '../../hooks/useTheme'
import ConfirmModal from '../Modal/variants/ConfirmModal'
import KontentSmartLink from '@kentico/kontent-smart-link'
const Layout = ({ children, languageCode = 'en', navLinks, footerData }) => {
  const { state, actions } = useTheme()
  const [languages, setLanguages] = useState([])
  const [translations, setTranslations] = useState([])

  useEffect(() => {
    // This is just an example of SDK initialization inside ES6 module.
    // HTML markup should still contain all necessary data-attributes (e.g. .layout element).
    const kontentSmartLink = KontentSmartLink.initialize({
      queryParam: 'enable-ksl-sdk',
    })
    return () => {
      kontentSmartLink.destroy()
    }
  })

  useEffect(() => {
    if (!state.languages.length) {
      fetch(
        `${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/languages`
      )
        .then((response) => response.json())
        .then((results) => {
          const tmp = []
          results.languages?.forEach((language) => {
            const { name, codename } = language.system
            const url = codename === 'en' ? `/` : `/${codename}/`
            tmp.push({ name: codename.toUpperCase(), url: url, region: name })
          })
          setLanguages(tmp)
          actions.changeLanguages(tmp)
        })
    } else {
      setLanguages(state.languages)
    }
  }, [state.languages])

  useEffect(() => {
    if (languageCode) {
      const tmp = []

      async function fetchData() {
        await fetch(
          `${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/items/translations?language=${languageCode}`
        )
          .then((response) => response.json())
          .then((results) => {
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
      }
      fetchData()
    } else {
      setTranslations(state.translations)
    }
  }, [languageCode])
  return (
    languages.length > 0 && (
      <div
        data-kontent-project-id={process.env.GATSBY_KONTENT_PROJECT_ID}
        data-kontent-language-codename={
          process.env.GATSBY_KONTENT_LANGUAGE_CODENAMES
        }
      >
        <ConfirmModal languageCode={languageCode} />
        {navLinks !== undefined && (
          <NavbarDefault
            navLinks={navLinks}
            languageCode={languageCode}
            languages={languages}
          />
        )}
        {children}
        {navLinks !== undefined && (
          <FooterDefault navLinks={navLinks} footer={footerData} />
        )}
      </div>
    )
  )
}

export default Layout
