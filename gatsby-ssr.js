const React = require('react')
const ThemeProvider = require('./src/context/ThemeContext').ThemeProvider

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <ThemeProvider>{element}</ThemeProvider>
}

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script defer={true} src="//info.edwards.com/js/forms2/js/forms2.min.js"></script>,
  ])
}
