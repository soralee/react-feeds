import React from 'react'
import { Feed } from 'semantic-ui-react'
import styled from 'styled-components'

import map from 'lodash/map'

import {response, getAdvertisementDummyData} from "../data"

import Post from "./Post"
import Advertisement from "./Advertisement"

const ADVERTISEMENT_SHOW_NUMBER = 5

const FeedsContainer = styled.div`
  padding: 50px;
  background-color: rgb(247, 247, 250);
  font-family: 'Roboto', Helvetica, sans-serif;
  color: #4A4A4A;
`;

const { data = [] } = response;
const advertisementData = getAdvertisementDummyData();

const Feeds = () => {
  return (
    <FeedsContainer>
      <Feed>
        {
          map(data, (props, index) => {
            const { id } = props;
            const showAdvertisement = (index + 1) % ADVERTISEMENT_SHOW_NUMBER === 0
            const advertisementIndex = (index + 1) / ADVERTISEMENT_SHOW_NUMBER

            return (
              <React.Fragment key={id}>
                <Post {...props} />
                {showAdvertisement && <Advertisement {...advertisementData[advertisementIndex]} />}
              </React.Fragment>
            )
          })
        }
      </Feed>
    </FeedsContainer>
  )
}

export default Feeds;
