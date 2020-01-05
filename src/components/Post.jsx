import React from 'react'
import { Feed, Segment } from 'semantic-ui-react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

import feedTypes from "../util/feedTypes"

import Avatar from "./reusable/Avatar"
import Summary from "./reusable/Summary"
import TextSection from "./reusable/TextBox"
import URLPreview from "./reusable/URLPreview"
import Images from "./reusable/Image"
import Player from "./reusable/Player"

const FeedContainer = Styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
`;

/* 
  overwrite style issue
  https://github.com/styled-components/styled-components/issues/501#issuecomment-279954075
*/
const Contents = Styled(Segment)`
  &&& {
    border: 1px solid rgb(232, 232, 236);
    border-radius: 6px;
    padding: 20px;
    background-color: white;
    width: 100%;
  }
`;

const Post = ({ 
  type,
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

Post.propTypes = {
  type: PropTypes.string,
  owner: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }),
  created_at: PropTypes.number,
  message: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string
  })),
  video: PropTypes.string
};

Post.defaultProps = {
  type: null,
  owner: {},
  created_at: null,
  message: null,
  images: [],
  video: null
};

export default Post;
