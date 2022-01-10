import React, { Component } from 'react'
import * as JsSearch from 'js-search'
import { Link } from 'gatsby'
import { DEFAULT_LANGUAGE } from '../../utils/constants'

const getUrl = (languageCode, url) => {
  if (languageCode === DEFAULT_LANGUAGE) {
    if (url === '/') {
      return '/';
    } else {
      return `/${url}/`;
    }
  }

  if (url === '/') {
    return `/${languageCode}/`;
  } else {
    return `/${languageCode}/${url}/`;
  }
};

const truncateText = (text) => {
  const maxLength = 200
  if (text?.length > maxLength) {
    return text.substr(0, maxLength) + '...'
  }
  return text
}

class ClientSearch extends Component {
  state = {
    isLoading: true,
    searchResults: [],
    search: null,
    isError: false,
    termFrequency: true,
    removeStopWords: false,
    searchQuery: '',
    selectedStrategy: '',
    selectedSanitizer: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.search === null) {
      const { engine } = nextProps
      return {
        termFrequency: engine.SearchByTerm,
        selectedSanitizer: engine.searchSanitizer,
        selectedStrategy: engine.indexStrategy,
      }
    }
    return null
  }

  async componentDidMount() {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const searchParam = params.get('s')
    this.rebuildIndex(() => {
      this.search(searchParam)
    })
  }

  /**
   * rebuilds the overall index based on the options
   */

  rebuildIndex = (callBack) => {
    const {
      selectedStrategy,
      selectedSanitizer,
      removeStopWords,
      termFrequency,
    } = this.state
    const { data } = this.props

    const dataToSearch = new JsSearch.Search('id')

    if (removeStopWords) {
      dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(
        dataToSearch.tokenizer
      )
    }
    /**
     * defines an indexing strategy for the data
     * read more about it here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    if (selectedStrategy === 'All') {
      dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    }
    if (selectedStrategy === 'Exact match') {
      dataToSearch.indexStrategy = new JsSearch.ExactWordIndexStrategy()
    }
    if (selectedStrategy === 'Prefix match') {
      dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    }

    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     */
    selectedSanitizer === 'Case Sensitive'
      ? (dataToSearch.sanitizer = new JsSearch.CaseSensitiveSanitizer())
      : (dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer())
    termFrequency === true
      ? (dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('id'))
      : (dataToSearch.searchIndex = new JsSearch.UnorderedSearchIndex())

    dataToSearch.addIndex('title')
    dataToSearch.addIndex('subtitle')
    dataToSearch.addIndex('body')
    dataToSearch.addIndex('name')
    dataToSearch.addIndex('type')

    // dataToSearch.addIndex("author")
    dataToSearch.addDocuments(data) // adds the data to be searched
    this.setState({ search: dataToSearch, isLoading: false }, () => {
      callBack()
    })
  }
  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  onSearchData = (e) => {
    this.search(e.target.value)
  }

  search = (text) => {
    const { search } = this.state
    const queryResult = search.search(text)
    this.setState({ searchQuery: text, searchResults: queryResult })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { searchResults, searchQuery } = this.state
    const { language, translation } = this.props
    const queryResults = searchQuery === '' ? [] : searchResults

    return (
      <>
        {translation && (
          <div className="container">
            <h1>{translation.Title}</h1>
            <div className="search">
              <div>
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="search"
                    className="search__search_field"
                    id="Search"
                    value={searchQuery}
                    onChange={this.onSearchData}
                    placeholder={translation.Placeholder}
                  />
                  {searchQuery && (
                    <label className="search__results_stats">
                      {translation.Results}: 1-{queryResults.length}{' '}
                      {translation.Of} {queryResults.length} {translation.For}{' '}
                      {searchQuery}
                    </label>
                  )}
                </form>
              </div>
              <div className="search__results">
                {queryResults.map((item, index) => {
                  return (
                    <article className="search__item" key={index}>
                      <h3>
                        <Link
                          to={getUrl(language, item.url)}
                          className="search__title"
                        >
                          {item.name}
                        </Link>
                      </h3>
                      {/* <p className="search__description">{item.title}</p> */}
                      <p className="search__description">
                        {item.body ? truncateText(item.body) : item.title}
                      </p>
                      <p className="search__tag">{item.name}</p>
                    </article>
                  )
                })}
                {searchQuery && queryResults.length === 0 && (
                  <p>{translation.Notfound}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default ClientSearch
