import React from 'react'
import { Feed, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import feedTypes from "../util/feedTypes"

import Avatar from "./reusable/Avatar"
import Summary from "./reusable/Summary"
import TextSection from "./reusable/TextBox"
import URLPreview from "./reusable/URLPreview"
import Images from "./reusable/Image"
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
    border-radius: 6px;
    padding: 20px;
    background-color: white;
    width: 100%;
  }
`;

const Feeds = ({ 
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
                  <Images
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

export default Feeds;
