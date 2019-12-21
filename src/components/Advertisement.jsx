import React from 'react'
import { Feed } from 'semantic-ui-react'
import styled from 'styled-components'

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

const Contents = styled.div`
  border: 1px solid rgb(232, 232, 236);
  border-radius: 6px;
  padding: 20px;
  background-color: lavender;
  width: 100%;
`;

const Advertisement = ({ 
  id,
  type,
  privacy,
  owner = {},
  created_at,
  message,
  images = [],
  video,
 }) => {
  const { name, image } = owner;
  return (
    <Feed.Event>
      <FeedContainer>
        <Avatar image={image} />
        <Contents>
            <Summary created_at={created_at} name={name} />
            <Feed.Extra>
              <div>
                <TextSection message={message} />
                {type === feedTypes.share && (<URLPreview message={message} />)}
                {type === feedTypes.image && (
                  <ImageSection
                    images={images}
                    message={message}
                    headerChildren={<Summary />}
                  />
                )}
                {type === feedTypes.video && <Player video={video} />}
              </div>
            </Feed.Extra>
            {
              // <Feed.Meta>
              //   <Feed.Like>
              //     <Icon name='like' />5 Likes
              //   </Feed.Like>
              // </Feed.Meta>
            }
        </Contents>
      </FeedContainer>
    </Feed.Event>
  )
}

export default Advertisement;
