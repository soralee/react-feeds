import React from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledImage = Styled.div`
  padding: 20px;

  img {
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    width: 40px;
    height: 40px;
  }
`;

const Avatar = ({ image }) => (
  <StyledImage>
    <img src={image} alt="" />
  </StyledImage>
)

Avatar.propTypes = {
  image: PropTypes.string
};

Avatar.defaultProps = {
  image: null
};

export default Avatar;
