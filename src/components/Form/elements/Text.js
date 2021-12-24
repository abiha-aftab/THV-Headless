import React from 'react'
import { useField, ErrorMessage } from 'formik'

const Text = ({ label, required, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <label>
      {label} {required && <span className="text-crimson">*</span>}
      <div className="form__control">
        <input
          className="form__text"
          {...field}
          {...props}
          autoComplete="off"
        />
        <div className="form__error">
          <ErrorMessage name={field.name} />
        </div>
      </div>
    </label>
  )
}

export default Text
