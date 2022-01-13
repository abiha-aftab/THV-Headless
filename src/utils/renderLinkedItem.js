import React from 'react'
import Table from '../components/Table'
import Infographics from '../containers/Infographics'
import Cards from '../containers/Cards'

const renderLinkedItem = (linkedItem, id, code) => {
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
    case 'cards':
      return <Cards data={elements} id={id} />
    default:
      return <h1>{type}</h1>
  }
}

export default renderLinkedItem
