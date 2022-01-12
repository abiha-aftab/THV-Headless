import React, { useEffect, useState } from 'react'
import '../../assets/scss/main.scss'
import FooterDefault from '../../containers/Footer/variants/FooterDefault'
import NavbarDefault from '../../containers/Navbar/variants/NavbarDefault'
import { useTheme } from '../../hooks/useTheme'
import ConfirmModal from '../Modal/variants/ConfirmModal'
import { DEFAULT_LANGUAGE } from '../../utils/constants'
import KontentSmartLink from '@kentico/kontent-smart-link'

const checkPathNameAgainstLanguages = (tmp, actions) => {
  // SET LANGUAGE BASED ON THE PATHNAME:
  const pathName = window?.location?.pathname
  if (pathName && tmp) {
    const parts = pathName.split('/')
    if (parts && parts.length > 0) {
      let found = null
      for (const part of parts) {
        if (part) {
          found = tmp.find((lang) => lang.name === part.toUpperCase())
          if (found) {
            actions.changeLanguage(found)
            break
          }
        }
      }
      // DEFAULT CASE:
      if (!found) {
        const defaultLang = tmp.find(
          (lang) => lang.name === DEFAULT_LANGUAGE.toUpperCase()
        )
        actions.changeLanguage(defaultLang)
      }
    }
  }
}

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
          checkPathNameAgainstLanguages(tmp, actions)
        })
    } else {
      setLanguages(state.languages)
    }
  }, [state.languages])

  useEffect(() => {
    checkPathNameAgainstLanguages(state.languages, actions)
  }, [])

  useEffect(() => {
    if (languageCode) {
      const tmp = []
      async function fetchData() {
        await fetch(
          `${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/items/translations?language=${languageCode}`
        )
          .then((response) => response.json())
          .then((results) => {
            console.log('results', results)
            let val = results.item.elements.translation.value.length
            for (let i = 0; i < val; i++) {
              const { elements, system } =
                results.modular_content[Object.keys(results.modular_content)[i]]
              tmp.push({
                key: system.name,
                value: elements.value.value,
              })
              tmp.push({
                key: `webspotlight${system.name}`,
                value: system,
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
          <FooterDefault
            navLinks={navLinks}
            footer={footerData}
            languageCode={languageCode}
          />
        )}
      </div>
    )
  )
}

export default Layout
