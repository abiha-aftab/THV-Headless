import React from 'react'
import CallToAction from '../CallToAction'
import InfoBlock from '../InfoBlock'
import { DEFAULT_LANGUAGE } from '../../utils/constants'

const DynamicZone = ({ data, socialSharing = null, languageCode = DEFAULT_LANGUAGE }) => {
  const sections = data.map((section) => {
    const {
      elements,
      system: { type, id },
    } = section
    switch (type) {
      case 'info_block':
        return <InfoBlock data={elements} key={id} socialSharing={socialSharing} />
      case 'call_to_action':
        return <CallToAction data={elements} key={id} languageCode={languageCode} />
      default:
        return null
    }
  })
  return sections
}

export default DynamicZone
