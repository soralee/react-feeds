import React from 'react'
import Styled from 'styled-components'
import Linkify from 'react-linkify'
import PropTypes from 'prop-types'

const Text = Styled.div`
  width: 100%;
  resize: vertical;
  padding: 7px;
  min-height: auto;
  white-space: pre-wrap;
  min-width: 800px;
`;

const TextBox = ({ message }) => (
  <Text>
    <Linkify>{message}</Linkify>
  </Text>
)

TextBox.propTypes = {
  message: PropTypes.string
}

TextBox.defaultProps = {
  message: null
}

export default TextBox;
