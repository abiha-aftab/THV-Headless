import React, { Fragment, useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { prepareTranslations } from '../../utils/prepareTranslations'
import useWindowDimensions from '../../utils/useWindowDimensions'

const Steps = ({ step }) => {
  const { state } = useTheme()
  const { width } = useWindowDimensions();
  const isMobile = width <= 420

  let translatedItemCheckout = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
  }
  const steps = [
    {
      title: `${
        translatedItemCheckout?.StepOne
          ? translatedItemCheckout.StepOne
          : 'Review selection'
      }`,
      id: 1,
    },
    {
      title: `${
        translatedItemCheckout?.StepTwo
          ? translatedItemCheckout.StepTwo
          : 'Enter delivery address'
      }`,
      id: 2,
    },
    {
      title: `${
        translatedItemCheckout?.StepThree
          ? translatedItemCheckout?.StepThree
          : 'Confirm'
      }`,
      id: 3,
    },
  ]
  return (
    <section className="section bg-steel-light">
      <div className="container">
        <div className="grid-md-12">
          <div className="steps start-md-3 end-md-11">
            {steps.map((item) => {
              const { title, id } = item
              return (
                <Fragment key={id}>
                  <div
                    className={
                      step === id || id < step
                        ? 'steps__step steps__step--active'
                        : 'steps__step'
                    }
                  >
                    <div className="steps__number">{id}</div>
                    {(!isMobile || step === id) && (
                      <div className="steps__title">{title}</div>
                    )}
                  </div>
                  {id !== steps.length && <div className="steps__line"></div>}
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Steps
