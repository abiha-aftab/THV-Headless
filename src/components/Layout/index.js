import React, { useEffect, useState } from 'react'
import '../../assets/scss/main.scss'
import FooterDefault from '../../containers/Footer/variants/FooterDefault'
import NavbarDefault from '../../containers/Navbar/variants/NavbarDefault'
import { useTheme } from '../../hooks/useTheme'
import { fetchTranslation } from '../../utils/fetchTranslation'

const Layout = ({ children, languageCode = 'en', navLinks, footerData }) => {
  const { state, actions } = useTheme()
  const [languages, setLanguages] = useState([])
  const [translations, setTranslations] = useState([])

  useEffect(() => {
    if (!state.languages.length) {
      fetch(
        `${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/languages`
      )
        .then((response) => response.json())
        .then((results) => {
          const tmp = []
          results.languages?.forEach((language) => {
            console.log(language)
            const { codename } = language.system
            const url = codename === 'en' ? `/` : `/${codename}/`
            tmp.push({ name: codename.toUpperCase(), url: url })
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
      let tmp = fetchTranslation(languageCode)
      console.log('mytmp', tmp)
      setTranslations(tmp)
      actions.changeTranslations(tmp)
    } else {
      setTranslations(state.translations)
    }
  }, [languageCode])
  return (
    languages.length > 0 && (
      <>
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
      </>
    )
  )
}

export default Layout
