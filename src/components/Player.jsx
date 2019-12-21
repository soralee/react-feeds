import React from 'react'
import styled from 'styled-components'
import handleViewport from 'react-in-viewport';

import map from 'lodash/map'; 
import get from 'lodash/fp/get'; 
import flow from 'lodash/fp/flow'; 

const VideoContents = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const Video = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Block = ({ inViewport, forwardedRef, id, url }) => {
  const playVideo = () => flow(
    get("current"),
    current => current.play()
  )(forwardedRef);

  const pauseVideo = () => flow(
    get("current"),
    current => current.pause()
  )(forwardedRef);
  
  if (get("current.play", forwardedRef)) {
    inViewport ? playVideo() : pauseVideo()
  }

  return (
     <VideoContents>
       <Video>
        <video
          ref={forwardedRef}
          key={id}
          src={url}
          controls
          muted
        />
      </Video>
     </VideoContents>
  );
};

const ViewportVideo = handleViewport(Block);

const Player = ({ videos }) => {
  return (
    map(videos, ({ url, id }) => (
      <ViewportVideo
        url={url}
        key={id}
    />
    ))
  )
}
export default Player;
