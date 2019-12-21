import React, { useRef } from 'react'
import styled from 'styled-components'
import handleViewport from 'react-in-viewport'

import get from 'lodash/fp/get' 
import flow from 'lodash/fp/flow' 

const VideoContents = styled.div`
  height: 100%;
  margin: 40px 0;
`;

const Video = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    z-index: 1;
  }
`;

const LogCollectArea = styled.div`
  width: 100%;
  height: 10%;
  position: absolute;
  visibility: hidden;
`;

const Block = ({
  inViewport,
  forwardedRef,
  url,
}) => {
  let videoRef = useRef(null);

  const playVideo = (targetRef) => flow(
    get("current"),
    current => current.play()
  )(targetRef);

  const pauseVideo = (targetRef) => flow(
    get("current"),
    current => current.pause()
  )(targetRef);

  if (get("current.play", videoRef)) {
    inViewport ? playVideo(videoRef) : pauseVideo(videoRef)
  }

  return (
    <VideoContents>
      <Video>
        <video
          ref={videoRef}
          src={url}
          controls
          muted
        />
        <LogCollectArea ref={forwardedRef} />
      </Video>
    </VideoContents>
 );
};

const ViewportVideo = handleViewport(Block);

const Player = ({ video }) => (
  <ViewportVideo url={video} />
)

export default Player;
