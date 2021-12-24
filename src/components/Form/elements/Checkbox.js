import React from 'react'
import { useField, ErrorMessage } from 'formik'

const Checkbox = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <fieldset className="form__fieldset">
      <div className="form__control">
        <label>
          <input
            type="checkbox"
            className="form__checkbox"
            {...field}
            {...props}
            autoComplete="off"
          />
          {label}
        </label>
        <div className="form__error">
          <ErrorMessage name={field.name} />
        </div>
      </div>
    </fieldset>
  )
}

export default Checkbox
