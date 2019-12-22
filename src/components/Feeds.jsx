import React, { useState, useEffect, useCallback } from 'react'
import { Segment, Feed, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller';

import toInteger from 'lodash/toInteger'
import keys from 'lodash/keys'
import size from 'lodash/size'

import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'

import {
  getPostDummyData,
  getAdvertisementDummyData,
  mock_post_data,
  mock_advertisement
} from "../data"

import Post from "./Post"
import Advertisement from "./Advertisement"

const ADVERTISEMENT_SHOW_NUMBER = 5

const FeedsContainer = styled.div`
  padding: 50px;
  background-color: rgb(247, 247, 250);
  font-family: 'Roboto', Helvetica, sans-serif;
  color: #4A4A4A;
  width: 70%;
`;

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  margin-left: 80px;
  padding: 10px;
`;

const Loader = styled(Segment)`
  &&& {
    border: 1px solid rgb(232, 232, 236);
    padding: 30px;
    background-color: white;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
`;

const INCREASE_ITEM_SIZE = 20
const uncappedMap = map.convert({ cap: false });

const Feeds = () => {
  const [postData, setPostData] = useState(getPostDummyData())
  const [advertisementData, setAdvertisementData] = useState(getAdvertisementDummyData())
  const [isFetchLoading, setFetchLoading] = useState(false)

  const fetchData = useCallback((_page) => {
    if (isFetchLoading) {
      // TODO: chage it to API
      const fetchedPostData = mock_post_data;
      const fetchedAdvertisementData = mock_advertisement;

      flow(
        uncappedMap((_, id) => {
          const keyList = keys(fetchedPostData)
          const keySize = size(keyList)
          const objectKey = keyList[id % keySize];
          return ({ ...fetchedPostData[objectKey], id: (size(postData) + id) })
        }),
        concat(postData),
        setPostData
      )(Array(INCREASE_ITEM_SIZE))

      flow(
        uncappedMap((_, id) => {
          const keyList = keys(fetchedAdvertisementData)
          const keySize = size(keyList)
          const objectKey = keyList[id % keySize];
          return ({ ...fetchedAdvertisementData[objectKey], id: (size(advertisementData) + id) })
        }),
        concat(advertisementData),
        setAdvertisementData
      )(Array(INCREASE_ITEM_SIZE))

      setFetchLoading(false)
    }
  }, [isFetchLoading, postData, advertisementData])

  useEffect(() => {
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [isFetchLoading, fetchData]);

  return (
    <FeedsContainer>
      <Feed>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => setFetchLoading(true)}
          hasMore
          loader={
            <Feed.Event key="loader-1">
              <LoaderContainer>
                <Loader loading>
                  <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Loader>
              </LoaderContainer>
            </Feed.Event>
          }
        >
          {
            uncappedMap((props, index) => {
              const { id } = props;
              const showAdvertisement = ((index + 1) % ADVERTISEMENT_SHOW_NUMBER === 0)
              const advertisementIndex = toInteger(index / ADVERTISEMENT_SHOW_NUMBER)

              return (
                <React.Fragment key={id}>
                  <Post {...props} />
                  {showAdvertisement && <Advertisement {...advertisementData[advertisementIndex]} />}
                </React.Fragment>
              )
            }, postData)
          }
        </InfiniteScroll>
      </Feed>
    </FeedsContainer>
  )
}

export default Feeds;
