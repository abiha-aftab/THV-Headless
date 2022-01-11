import React from 'react'
import CallToAction from '../CallToAction'
import InfoBlock from '../InfoBlock'
import { DEFAULT_LANGUAGE } from '../../utils/constants'

const DynamicZone = ({
  data,
  socialSharing = null,
  languageCode = DEFAULT_LANGUAGE,
}) => {
  const sections = data.map((section) => {
    const {
      elements,
      system: { type, id, codename },
    } = section

    switch (type) {
      case 'info_block':
        return (
          <InfoBlock
            data={elements}
            id={id}
            code={codename}
            socialSharing={socialSharing}
          />
        )
      case 'call_to_action':
        return (
          <CallToAction
            data={elements}
            id={id}
            code={codename}
            languageCode={languageCode}
          />
        )
      default:
        return null
    }
  })
  return sections
}

export default DynamicZone
