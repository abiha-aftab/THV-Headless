import React from 'react'
import Table from '../components/Table'
import Infographics from '../containers/Infographics'

const renderLinkedItem = (linkedItem) => {
  if (!linkedItem) {
    return <strong>⚠ Linked item is no longer in the response.</strong>
  }
  const {
    elements,
    system: { type },
  } = linkedItem
  switch (type) {
    case 'table':
      return <Table data={elements} />
    case 'infographics':
      return <Infographics data={elements} />
    default:
      return <h1>{type}</h1>
  }
}

export default renderLinkedItem
