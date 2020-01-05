import React, { useRef } from 'react'
import Styled from 'styled-components'
import handleViewport from 'react-in-viewport'
import PropTypes from 'prop-types'

import get from 'lodash/fp/get' 
import flow from 'lodash/fp/flow' 

const VideoContents = Styled.div`
  height: 100%;
  margin: 40px 0;
`;

const Video = Styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    z-index: 1;
  }
`;

const LogCollectArea = Styled.div`
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
  const videoRef = useRef(null);

  const playVideo = (targetRef) => flow(
    get("current"),
    /*
      React error when using audio.play() function 
      https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    */
    current => {
      const playPromise = current.play()

      if (playPromise) {
        playPromise.catch(error => console.log(error))
      }
    }
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

Player.propTypes = {
  video: PropTypes.string
};

Player.defaultProps = {
  video: null
};

export default Player;
