import React from 'react'
import { graphql } from 'gatsby'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import FormBasic from '../../components/Form/variants/FormBasic'

const MarketoForm = ({ formTitle, description, form_number }) => {
  return (
    <section className="section bg-sky-light">
      <div className="container">
        <h2>{formTitle}</h2>
        <div className="grid-md-2">
          <RichTextElement value={description} />
          <FormBasic id={form_number} />
        </div>
      </div>
    </section>
  )
}

export default MarketoForm

export const query = graphql`
  fragment marketoForm on kontent_item_marketo_form {
    elements {
      form_number {
        value
      }
      title {
        value
      }
      description {
        value
      }
    }
  }
`
