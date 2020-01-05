import React from 'react'
import { ReactTinyLink } from 'react-tiny-link' // For rich link previews
import PropTypes from 'prop-types'

import map from 'lodash/map'

const URLPreview = ({ message }) => {
  // extract URL list from message
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const urlList = message.match(urlRegex);
  return map(urlList, (url, index) => (
    <ReactTinyLink
      key={index}
      url={url}
      cardSize="small"
      showGraphic
    />
  ))
}

URLPreview.propTypes = {
  message: PropTypes.string
}

URLPreview.defaultProps = {
  message: null
}

export default URLPreview;
