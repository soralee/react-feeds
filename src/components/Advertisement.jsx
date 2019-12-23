import React, { useState } from 'react'
import { Segment, Icon, Label, Button, Feed } from 'semantic-ui-react'
import styled from 'styled-components'
import handleViewport from 'react-in-viewport'

import includes from "lodash/includes"
import noop from 'lodash/noop'

import feedTypes from "../util/feedTypes"

import Avatar from "./reusable/Avatar"
import Summary from "./reusable/Summary"
import TextSection from "./reusable/TextBox"
import URLPreview from "./reusable/URLPreview"
import ImageSection from "./reusable/Image"
import Player from "./reusable/Player"

const FeedContainer = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
`;

/* 
  overwrite style isse
  https://github.com/styled-components/styled-components/issues/501#issuecomment-279954075
*/
const Contents = styled(Segment)`
  &&& {
    border: 1px solid rgb(232, 232, 236);
    padding: 20px;
    background-color: white;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
`;

const LogCollectBlock = ({
  inViewport,
  forwardedRef,
  enterCount,
  onAddLogCollection = noop,
  children
}) => {
  if (inViewport && enterCount === 1) {
    onAddLogCollection();
  }

  return (
    <div ref={forwardedRef}>
      {children}
    </div>
 );
};

const ViewportArea = handleViewport(LogCollectBlock);

const Advertisement = ({ 
  id,
  type,
  privacy,
  owner = {},
  created_at,
  message,
  ad_message,
  images = [],
  video,
 }) => {
  const [logCollection, setLogCollection] = useState([]);

  const pushLogCollection = () => {
    if (!includes(logCollection, id)) {
      console.log(`Collected ownerName:"${name}" log successfully!`)
      setLogCollection([...logCollection, id])
    }
  }
  const { name, image } = owner;
  return (
    <Feed.Event>
      <FeedContainer>
        <Avatar image={image} />
        <div style={{ width: "100%" }}>
          <Contents attached color='teal'>
            <Label attached='top right' color='teal'>Advertisement</Label>
            <Summary created_at={created_at} name={name} privacy={privacy} />
            <Feed.Extra>
              <ViewportArea onAddLogCollection={() => pushLogCollection()}>
                <TextSection message={message} />
                {type === feedTypes.share && (<URLPreview message={message} />)}
                {type === feedTypes.image && (
                  <ImageSection
                    images={images}
                    isLogCollectMode
                  />
                )}
                {type === feedTypes.video && <Player video={video} />}
              </ViewportArea>
            </Feed.Extra>
          </Contents>
          <a href="." target="_blank" rel="noopener noreferrer">
            <Button.Group attached='bottom'>
              <Button color='teal' fluid icon size='small' labelPosition='right'>
                {ad_message}
                <Icon name='arrow right' />
              </Button>
            </Button.Group>
          </a>
        </div>
      </FeedContainer>
    </Feed.Event>
  )
}

export default Advertisement;
