import React from 'react'
import { Feed, Image, Modal } from 'semantic-ui-react'
import { ReactTinyLink } from 'react-tiny-link' // For rich link previews
import styled from 'styled-components'
import Linkify from 'react-linkify';
import moment from "moment";
import map from 'lodash/map'; 

import response from "../data";
import feedTypes from "../util/feedTypes";

const FeedsContainer = styled.div`
  padding: 50px;
  background-color: rgb(247, 247, 250);
  font-family: 'Roboto', Helvetica, sans-serif;
  color: #4A4A4A;
`;

const FeedContainer = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
`;

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

const TextBox = styled.div`
  width: 100%;
  resize: vertical;
  padding: 7px;
  min-height: 100px;
  white-space: pre-wrap;
  min-width: 800px;
`;

const OwnerName = styled.div`
  color: #00B68F;
  font-weight: bold;
  font-size: 16px;
`;

const Date = styled.div`
  color: #999;
  font-size: 14px;
  margin-left: 10px;
`;

const Contents = styled.div`
  border: 1px solid rgb(232, 232, 236);
  border-radius: 6px;
  padding: 20px;
  background-color: white;
  width: 100%;
`;

const URLContents = ({ message }) => {
  // extract URL list from message
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const urlList = message.match(urlRegex);
  return map(urlList, (url, index) => (
    <ReactTinyLink
      key={index}
      url={url}
      cardSize="small"
      maxLine={2}
      minLine={1}
      showGraphic
    />
  ))
}

const ImageContents = ({ images, message, headerChildren }) => {
  return (
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
}

const { data = [] } = response;
const Feeds = () => {
  return (
    <FeedsContainer>
      <Feed>
        {
          map(data, ({
            id, type, privacy, owner = {}, created_at, message, images
          }) => {
            const { name, image } = owner;
            const Summary = () => (
              <Feed.Summary
                date={<Date>{moment(created_at).fromNow()}</Date>}
                user={<OwnerName>{name}</OwnerName>}
                style={{ display: "flex" }}
              />
            )
            return (
              <Feed.Event key={id}>
                <FeedContainer>
                  <StyledImage><img src={image} alt="" /></StyledImage>
                  <Contents>
                      <Summary />
                      <Feed.Extra>
                        <div>
                          <TextBox>
                            <Linkify>{message}</Linkify>
                          </TextBox>
                          {type === feedTypes.share && (<URLContents message={message} />)}
                          {type === feedTypes.image && (
                            <ImageContents
                              images={images}
                              message={message}
                              headerChildren={<Summary />}
                            />
                          )}
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
          })
        }
      </Feed>
    </FeedsContainer>
  )
}

export default Feeds;
