import React, { Fragment } from 'react'

const Steps = ({ step }) => {
  const steps = [
    {
      title: 'Review selection',
      id: 1,
    },
    {
      title: 'Enter delivery address',
      id: 2,
    },
    {
      title: 'Confirm',
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
                    <div className="steps__title">{title}</div>
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
