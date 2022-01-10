import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useTheme } from '../../../../hooks/useTheme'
import { Formik, Form } from 'formik'
import { countries, occupations } from '../../../../assets/data/checkout'
import Checkbox from '../../elements/Checkbox'
import Select from '../../elements/Select'
import Text from '../../elements/Text'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import * as Yup from 'yup'
import { prepareTranslations } from '../../../../utils/prepareTranslations'

const FormCheckout = ({ step = 2, changeCheckoutStep, languageCode = 'en' }) => {
  const { state, actions } = useTheme()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [form, setForm] = useState(null)

  useEffect(() => {
    const tmpOrders = state.orders.filter((order) => {
      return order.locale === languageCode
    })
    setOrders(tmpOrders)
  }, [state.orders])

  const handleChangeCheckoutStep = (step) => {
    changeCheckoutStep(step)
  }

  let translatedItemCheckout = ''
  let translatedItemCheckoutForm = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
    key = 'CheckoutForm'
    translatedItemCheckoutForm = prepareTranslations(state.translations, key)
  }
  const handleSubmit = (values) => {
    window.scrollTo(0, 500)
    setForm(values)
    setIsValid(true)
    handleChangeCheckoutStep(step + 1)
  }
  const handleFormSubmission = () => {
    setIsLoading(true)
    window.MktoForms2.loadForm(
      '//info.edwards.com',
      '769-NOZ-917',
      6869,
      function (marketoForm) {
        marketoForm.addHiddenFields({
          FirstName: form.firstName,
          LastName: form.lastName,
          Email: form.email,
          Address_lead:
            form.address1 +
            (form.address1 || form.address2 ? '\n' : '') +
            form.address2,
          PostalCode: form.zipcode,
          City: form.city,
          Country: form.country,
          THV_Role__c: form.occupation,
          //tHVResourcesFulfilment: marketoOrder,
          Lead_Source_Details__c:
            'Resource library : ' + window.location.href.split(/[?#]/)[0],
        })
        marketoForm.submit()
        marketoForm.onSuccess(function () {
          setIsLoading(false)
          // returns orders from state having other locales once order is submitted
          actions.changeOrders(
            state.orders.filter((order) => {
              return order.locale !== languageCode
            })
          )
          navigate(
            languageCode === 'en' ? `/thank-you` : `/${languageCode}/thank-you`
          )
          return false
        })
      }
    )
  }
  const reqField = translatedItemCheckoutForm?.RequiredFrield
    ? translatedItemCheckoutForm?.RequiredFrield
    : 'is a required field'
  const firstName = translatedItemCheckoutForm?.FirstName
    ? translatedItemCheckoutForm?.FirstName
    : 'First Name'
  const surname = translatedItemCheckoutForm?.Surname
    ? translatedItemCheckoutForm?.Surname
    : 'Surname'
  const city = translatedItemCheckoutForm?.City
    ? translatedItemCheckoutForm?.City
    : 'City'
  const country = translatedItemCheckoutForm?.Country
    ? translatedItemCheckoutForm?.Country
    : 'Country'
  const email = translatedItemCheckoutForm?.Email
    ? translatedItemCheckoutForm?.Email
    : 'Email'
  const postcode = translatedItemCheckoutForm?.PostCode
    ? translatedItemCheckoutForm?.PostCode
    : 'Postcode'
  const address = translatedItemCheckoutForm?.Address
    ? translatedItemCheckoutForm?.Address
    : 'Street address'
  const apartment = translatedItemCheckoutForm?.Apartment
    ? translatedItemCheckoutForm?.Apartment
    : 'Apartment, suite, unit, etc.'
  const occupation = translatedItemCheckoutForm?.Occupation
    ? translatedItemCheckoutForm?.Occupation
    : 'What is your Occupation?'

  const validate = Yup.object({
    firstName: Yup.string().required(firstName + ' ' + reqField),
    lastName: Yup.string().required(surname + ' ' + reqField),
    address1: Yup.string().required(address + ' ' + reqField),
    address2: Yup.string(),
    city: Yup.string().required(city + ' ' + reqField),
    country: Yup.string().required(country + ' ' + reqField),
    county: Yup.string(),
    email: Yup.string()
      .email('Email is invalid')
      .required(email + ' ' + reqField),
    zipcode: Yup.string().required(postcode + ' ' + reqField),
    occupation: Yup.string().required(occupation + ' ' + reqField),
    consent: Yup.boolean(),
  })

  return (
    <>
      {!isValid && orders.length > 0 && (
        <>
        <button
          className="btn btn-ghost mb-1"
          onClick={() => {handleChangeCheckoutStep(step - 1);navigate(languageCode === 'en' ? `/basket` : `/${languageCode}/warenkorb`);}}
        >
          <FaChevronLeft className="mr-50" />{' '}
          {translatedItemCheckout?.Back
            ? translatedItemCheckout?.Back
            : 'Back'}
        </button>
        <Formik
          initialValues={
            form || {
              firstName: '',
              lastName: '',
              address1: '',
              address2: '',
              city: '',
              country: '',
              county: '',
              email: '',
              zipcode: '',
              occupation: '',
              consent: false,
            }
          }
          validationSchema={validate}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          {(formik) => (
            <Form className="form">
              <div className="gap-2 grid-md-2 mb-2">
                <Text label={firstName} name="firstName" type="text" required />
                <Text label={surname} name="lastName" type="text" required />
              </div>

              <div className="gap-2 grid-md-2 mb-2">
                <Text
                  label={address}
                  name="address1"
                  type="text"
                  required
                  placeholder={
                    translatedItemCheckoutForm?.AddressPlaceholder
                      ? translatedItemCheckoutForm?.AddressPlaceholder
                      : 'House number and street address'
                  }
                />
                <Text
                  label={apartment}
                  name="address2"
                  type="text"
                  placeholder={apartment}
                />
              </div>
              <div className="gap-2 grid-md-2 mb-2">
                <Text label={city} name="city" type="text" required />
                <Select
                  name="country"
                  label={country}
                  required
                  options={countries}
                />
              </div>

              <div className="gap-2 grid-md-2 mb-2">
                <Text
                  name="county"
                  label={
                    translatedItemCheckoutForm?.Canton
                      ? translatedItemCheckoutForm?.Canton
                      : 'Canton (optional)'
                  }
                  type="text"
                />
                <Text name="email" label={email} type="email" required />
              </div>

              <div className="gap-2 grid-md-2 mb-2">
                <Text name="zipcode" label={postcode} type="text" required />
              </div>
              <div className="gap-2 grid-1 mb-2">
                <Select
                  name="occupation"
                  label={occupation}
                  options={occupations}
                  required
                />
              </div>
              <div className="grid-1">
                <Checkbox
                  name="consent"
                  label={
                    translatedItemCheckoutForm?.NewsUpdates
                      ? translatedItemCheckoutForm?.NewsUpdates
                      : 'Receive news and update from Edwards Lifesciences each month (optional)'
                  }
                />
                {languageCode === 'en' ? (
                  <p className="small">
                    {translatedItemCheckoutForm?.AgreeToTerms
                      ? translatedItemCheckoutForm?.AgreeToTerms
                      : 'By providing your personal information, you agree to allow Edwards Lifesciences and its agents to use this information to communicate with you in the future, including information about products, services, events, and programs. Edwards Lifesciences and its agents will not sell, rent, or otherwise distribute your name and any personally identifiable information outside of Edwards Lifesciences and its agents. Edwards Lifesciences will use your information in accordance with the Edwards Privacy Policy.'}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <button
                type="submit"
                aria-label="Next page, to confirmation"
                className="btn btn-crimson btn-next mt-2 mb-2"
              >
                {translatedItemCheckoutForm?.Next
                  ? translatedItemCheckoutForm?.Next
                  : 'Next'}
                <FaChevronRight />
              </button>
            </Form>
          )}
        </Formik>
        </>
      )}
      {isValid && form && orders.length > 0 && (
        <>
          <button
            className="btn btn-ghost mb-1"
            onClick={() => {setIsValid(false); handleChangeCheckoutStep(step - 1)}}
          >
            <FaChevronLeft className="mr-50" />{' '}
            {translatedItemCheckout?.Back
              ? translatedItemCheckout?.Back
              : 'Back'}
          </button>
          <div>{`${form.firstName} ${form.lastName}`}</div>
          <div>{`${form.address1} ${form.address2}`}</div>
          <div>{`${form.zipcode} ${form.city}`}</div>
          <div>{`${form.country} ${form.county}`}</div>
          <div className="mt-1 mb-2">{`${form.email}`}</div>
          <button
            className={isLoading ? 'btn btn-primary' : 'btn btn-crimson'}
            onClick={handleFormSubmission}
          >
            {translatedItemCheckout?.ConfirmOrder
              ? translatedItemCheckout?.ConfirmOrder
              : 'Confirm Order'}
          </button>
        </>
      )}
      {!isValid && orders.length === 0 && (
        <h4>
          {translatedItemCheckout?.EmptyCart
            ? translatedItemCheckout?.EmptyCart
            : 'There is nothing in your cart.'}
        </h4>
      )}
    </>
  )
}

export default FormCheckout
