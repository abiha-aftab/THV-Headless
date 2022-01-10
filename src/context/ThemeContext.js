import React, { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ORDERS':
      if (action.payload)
        localStorage.setItem('orders', JSON.stringify(action.payload))
      else {
        localStorage.removeItem('orders')
      }
      return { ...state, orders: action.payload }
    case 'CHANGE_LANGUAGES':
      return { ...state, languages: action.payload }
    case 'CHANGE_TRANSLATIONS':
      return { ...state, translations: action.payload }
    case 'CHANGE_LANGUAGE':
      console.log(action.payload)
      if (action.payload)
        localStorage.setItem('language', JSON.stringify(action.payload))
      else {
        localStorage.removeItem('language')
      }
      return { ...state, language: action.payload }
    default:
      return state
  }
}

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, {
    orders: [],
    languages: [],
    translations: [],
    language: null,
  })

  const actions = {
    changeOrders: (orders) => {
      const updatedOrders = orders.reduce((acc, val) => {
        const index = acc.findIndex((i) => i.id === val.id)
        if (index !== -1) acc[index].count++
        else acc.push({ ...val, count: val.count || 1 })
        return acc
      }, [])
      dispatch({ type: 'CHANGE_ORDERS', payload: updatedOrders })
    },
    changeLanguages: (languages) => {
      dispatch({ type: 'CHANGE_LANGUAGES', payload: languages })
    },
    changeTranslations: (translations) => {
      dispatch({ type: 'CHANGE_TRANSLATIONS', payload: translations })
    },
    changeLanguage: (language) => {
      dispatch({ type: 'CHANGE_LANGUAGE', payload: language })
    },
  }

  return (
    <ThemeContext.Provider value={{ state, actions }}>
      {children}
    </ThemeContext.Provider>
  )
}
