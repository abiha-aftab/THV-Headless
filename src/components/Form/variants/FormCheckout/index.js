import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { countries, occupations } from '../../../../assets/data/checkout'
import Checkbox from '../../elements/Checkbox'
import Select from '../../elements/Select'
import Text from '../../elements/Text'
import { FaChevronLeft } from 'react-icons/fa'
import * as Yup from 'yup'

const FormCheckout = () => {
  const [isValid, setIsValid] = useState(false)
  const [form, setForm] = useState(null)
  const handleSubmit = (values) => {
    window.scrollTo(0, 500)
    setForm(values)
    setIsValid(true)
  }
  const handleFormSubmission = () => {
    window.MktoForms2.loadForm(
      '//info.edwards.com',
      '769-NOZ-917',
      17536,
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
        console.log(marketoForm.vals())
        marketoForm.submit()
        marketoForm.onSuccess(function () {
          console.log('submitted')
          return false
        })
      }
    )
  }
  const validate = Yup.object({
    firstName: Yup.string().required('First name is a required field.'),
    lastName: Yup.string().required('Surname is a required field.'),
    address1: Yup.string().required('Delivery address is a required field.'),
    address2: Yup.string(),
    city: Yup.string().required('City is a required field.'),
    country: Yup.string().required('Country is a required field'),
    county: Yup.string(),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    zipcode: Yup.string().required('Postcode is a required field.'),
    occupation: Yup.string().required('Occupation is a required field.'),
    consent: Yup.boolean(),
  })

  return (
    <>
      {!isValid && (
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
                <Text
                  label="First name"
                  name="firstName"
                  type="text"
                  required
                />
                <Text label="Surname" name="lastName" type="text" required />
              </div>

              <div className="gap-2 grid-md-2 mb-2">
                <Text
                  label="Street address"
                  name="address1"
                  type="text"
                  required
                  placeholder="House number and street address"
                />
                <Text
                  label="Apartment, suite, unit, etc."
                  name="address2"
                  type="text"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>
              <div className="gap-2 grid-md-2 mb-2">
                <Text label="Town / City" name="city" type="text" required />
                <Select
                  name="country"
                  label="Country"
                  required
                  options={countries}
                />
              </div>

              <div className="gap-2 grid-md-2 mb-2">
                <Text name="county" label="County (optional)" type="text" />
                <Text name="email" label="Email" type="email" required />
              </div>

              <div className="gap-2 grid-md-2 mb-2">
                <Text name="zipcode" label="Postcode" type="text" required />
              </div>
              <div className="gap-2 grid-1 mb-2">
                <Select
                  name="occupation"
                  label="What is your occupation?"
                  options={occupations}
                  required
                />
              </div>
              <div className="grid-1">
                <Checkbox
                  name="consent"
                  label="Receive news and update from Edwards Lifesciences each month (optional)"
                />
                <p className="small">
                  By providing your personal information, you agree to allow
                  Edwards Lifesciences and its agents to use this information to
                  communicate with you in the future, including information
                  about products, services, events, and programs. Edwards
                  Lifesciences and its agents will not sell, rent, or otherwise
                  distribute your name and any personally identifiable
                  information outside of Edwards Lifesciences and its agents.
                  Edwards Lifesciences will use your information in accordance
                  with the Edwards Privacy Policy.
                </p>
              </div>
              <button
                type="submit"
                aria-label="Next page, to confirmation"
                className="btn btn-crimson"
              >
                Next
              </button>
            </Form>
          )}
        </Formik>
      )}
      {isValid && form && (
        <>
          <button
            className="btn btn-ghost mb-1"
            onClick={() => setIsValid(false)}
          >
            <FaChevronLeft className="mr-50" /> back
          </button>
          <div>{`${form.firstName} ${form.lastName}`}</div>
          <div>{`${form.address1} ${form.address2}`}</div>
          <div>{`${form.zipcode} ${form.city}`}</div>
          <div>{`${form.country} ${form.county}`}</div>
          <div className="mt-1 mb-2">{`${form.email}`}</div>
          <button className="btn btn-crimson" onClick={handleFormSubmission}>
            Confirm Order
          </button>
        </>
      )}
    </>
  )
}

export default FormCheckout
