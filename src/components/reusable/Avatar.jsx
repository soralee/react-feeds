import React from 'react'
import styled from 'styled-components'

const StyledImage = styled.div`
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

export default Avatar;
