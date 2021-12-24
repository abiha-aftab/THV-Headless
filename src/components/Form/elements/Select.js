import React from 'react'
import { useField, ErrorMessage } from 'formik'

const Select = ({ label, required, options, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <label>
      {label} {required && <span className="text-crimson">*</span>}
      <div className="form__control">
        <select
          className="form__select"
          {...field}
          {...props}
          autoComplete="off"
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            )
          })}
        </select>
        <div className="form__error">
          <ErrorMessage name={field.name} />
        </div>
      </div>
    </label>
  )
}

export default Select
