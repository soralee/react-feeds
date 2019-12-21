import React from 'react'
import styled from 'styled-components'
import handleViewport from 'react-in-viewport';

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

  video {
    width: 100%;
  }
`;

const Block = ({ inViewport, forwardedRef, url }) => {
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
          src={url}
          controls
          muted
        />
      </Video>
     </VideoContents>
  );
};

const ViewportVideo = handleViewport(Block);

const Player = ({ video }) => (
  <ViewportVideo url={video} />
)

export default Player;
