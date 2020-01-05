import React from 'react'
import { Image, Modal } from 'semantic-ui-react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

import map from 'lodash/map'
import noop from 'lodash/noop';

const ImagesContainer = Styled.div`
  width: 70%;
`;

const ImageContainer = Styled.div`
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

BasicImages.propTypes = {
  message: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string
  })),
  headerChildren: PropTypes.element
};

BasicImages.defaultProps = {
  message: null,
  images: [],
  headerChildren: null
}

const Images = ({ images, message, headerChildren, isLogCollectMode, onAddLogCollection }) => (
  isLogCollectMode ? (
    <NonClickImages images={images} onAddLogCollection={onAddLogCollection} />
  ) : (
    <BasicImages images={images} message={message} headerChildren={headerChildren} />
  )
)

Images.propTypes = {
  message: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string
  })),
  headerChildren: PropTypes.element,
  isLogCollectMode: PropTypes.bool,
  onAddLogCollection: PropTypes.func
};

Images.defaultProps = {
  message: null,
  images: [],
  headerChildren: null,
  isLogCollectMode: false,
  onAddLogCollection: noop
};

export default Images;
