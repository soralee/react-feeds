import React from 'react'
import { Image, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

import map from 'lodash/map'

const ImagesContainer = styled.div`
  width: 70%;
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
`;

const NonClickImages = ({ images }) => (
  <ImagesContainer>
    {
      map(images, ({ url, id }) => (
        <ImageContainer key={id}>
          <div style={{ zIndex: 1 }}>
            <img src={url} alt="advertisement" />
          </div>
        </ImageContainer>
      ))
    }
  </ImagesContainer>
)

const BasicImages = ({ images, message, headerChildren }) => (
  <Image.Group size='small'>
    {
      map(images, ({ url, id }) => (
        <Modal key={id} trigger={<Image src={url} style={{ cursor: "pointer" }} />}>
          <Modal.Header>{headerChildren}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='big' src={url} />
            <Modal.Description>
              {message}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      ))
    }
  </Image.Group>
)

const Images = ({ images, message, headerChildren, isLogCollectMode, onAddLogCollection }) => (
  isLogCollectMode ? (
    <NonClickImages images={images} onAddLogCollection={onAddLogCollection} />
  ) : (
    <BasicImages images={images} message={message} headerChildren={headerChildren} />
  )
)

export default Images;
