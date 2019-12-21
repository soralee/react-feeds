import React from 'react'
import { Image, Modal } from 'semantic-ui-react'

import map from 'lodash/map'

const ImageContents = ({ images, message, headerChildren }) => (
  <Image.Group size='small'>
    {
      map(images, ({ url, id }) => (
        <Modal key={id} trigger={<Image src={url} style={{ cursor: "pointer" }} />}>
          <Modal.Header>{headerChildren}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={url} />
            <Modal.Description>
              {message}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      ))
    }
  </Image.Group>
)

export default ImageContents;
