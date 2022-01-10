import React, { useState, useEffect } from 'react'
import { prepareTranslations } from '../../../../utils/prepareTranslations'
import { useTheme } from '../../../../hooks/useTheme'
import { navigate } from 'gatsby'

const marketoScriptId = 'mktoForms'

export default function FormBasic({ id }) {
  const { state, actions } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFormVisible, setIsVisible] = useState(true)

  let translatedItemThankyouMessage = ''
  if (state.translations.length) {
    let key = 'FormSubmission'
    translatedItemThankyouMessage = prepareTranslations(state.translations, key)
  }

  useEffect(() => {
    if (!document.getElementById(marketoScriptId)) {
      loadScript()
    } else {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    isLoaded &&
      window.MktoForms2.loadForm(
        '//info.edwards.com',
        '769-NOZ-917',
        id,
        function (form) {
          form.onSuccess(function (values, followUpUrl) {
            setIsVisible(false)
            return false
          })
        }
      )
  }, [isLoaded, id, isFormVisible])

  const loadScript = () => {
    let s = document.createElement('script')
    s.id = marketoScriptId
    s.type = 'text/javascript'
    s.async = true
    s.src = '//info.edwards.com/js/forms2/js/forms2.min.js'
    s.onreadystatechange = function () {
      if (this.readyState === 'complete' || this.readyState === 'loaded') {
        setIsLoaded(true)
      }
    }
    s.onload = () => setIsLoaded(true)
    document.getElementsByTagName('head')[0].appendChild(s)
  }

  return isFormVisible ? (
    <>
      <form id={`mktoForm_${id}`}></form>
    </>
  ) : (
    <>
      <div id="confirmnewsletterform">
        <h3 className="newsletter-thanks-message">
          {translatedItemThankyouMessage.thankyou ?? 'Thank you!'}
        </h3>
        <p>
          {translatedItemThankyouMessage.message ??
            'For signing up to the monthly Edwards Lifesciences newsletter. You will now receive emails on the latest developments and industry insights on mitral and tricuspid regurgitation.'}
        </p>
      </div>
    </>
  )
}
