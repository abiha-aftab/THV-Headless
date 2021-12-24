import React from 'react'
import CallToAction from '../CallToAction'
import InfoBlock from '../InfoBlock'

const DynamicZone = ({ data }) => {
  const sections = data.map((section) => {
    const {
      elements,
      system: { type, id },
    } = section
    switch (type) {
      case 'info_block':
        return <InfoBlock data={elements} key={id} />
      case 'call_to_action':
        return <CallToAction data={elements} key={id} />
      default:
        return null
    }
  })
  return sections
}

export default DynamicZone
