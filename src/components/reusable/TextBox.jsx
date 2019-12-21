import React from 'react'
import styled from 'styled-components'
import Linkify from 'react-linkify'

const Text = styled.div`
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

export default TextBox;
