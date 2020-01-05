import React, { useState, useEffect, useCallback } from 'react'
import { Segment, Feed, Image } from 'semantic-ui-react'
import Styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'

import toInteger from 'lodash/toInteger'
import keys from 'lodash/keys'
import size from 'lodash/size'

import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'
import get from 'lodash/fp/get'

import { formatData } from "../util/util"

import mock_post_data from "../data/post.json"
import mock_advertisement from "../data/advertisement.json"

import Post from "./Post"
import Advertisement from "./Advertisement"

const ADVERTISEMENT_SHOW_NUMBER = 5

const AppContainer = Styled.div`
  background-color: rgb(247, 247, 250);
  font-family: 'Roboto', Helvetica, sans-serif;
  color: #4A4A4A;
  width: 100%;
`;

const FeedsContainer = Styled.div`
  padding: 50px;
  width: 70%;
`;

const LoaderContainer = Styled.div`
  width: 100%;
  display: flex;
  padding: 50px;
  margin-left: 40px;
`;

const Loader = Styled(Segment)`
  &&& {
    border: 1px solid rgb(232, 232, 236);
    padding: 30px;
    background-color: white;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;

    img {
      width: 100%;
    }
  }
`;

const INCREASE_ITEM_SIZE = 20
const uncappedMap = map.convert({ cap: false });

const useGetApi = () => {
  const [postData, setPostData] = useState([])
  const [advertisementData, setAdvertisementData] = useState([])
  const [isInitialized, setInitialized] = useState(false)
  useEffect(() => {
    if (!isInitialized) {
      axios.get("/data/post.json")
      .then(
        (result) => {

        flow(
          get("data"),
          formatData,
          setPostData
        )(result)
      },
        (error) => {
          console.log("fetch advertisement api error", error)
        }
      )

      axios.get("../data/advertisement.json")
      .then(
        (result) => {
          flow(
            get("data"),
            formatData,
            setAdvertisementData
          )(result)
        },
        (error) => {
          console.log("fetch advertisement api error", error)
        }
      )
      setInitialized(true)
    }
  }, [isInitialized])
  return { postData, setPostData, advertisementData, setAdvertisementData }
}

const getData = ({ currentData, newData }) => uncappedMap((_, id) => {
  const keyList = keys(newData)
  const keySize = size(keyList)
  const objectKey = keyList[id % keySize];
  return ({ ...newData[objectKey], id: (size(currentData) + id) })
})

const Feeds = () => {
  const  { postData, setPostData, advertisementData, setAdvertisementData } = useGetApi()
  const [isFetchLoading, setFetchLoading] = useState([])

  const fetchData = useCallback((_page) => {
    if (isFetchLoading) {
      // TODO: chage it to API
      const fetchedPostData = mock_post_data;
      const fetchedAdvertisementData = mock_advertisement;

      flow(
        getData({ newData: fetchedPostData, currentData: postData }),
        concat(postData),
        setPostData
      )(Array(INCREASE_ITEM_SIZE))

      flow(
        getData({ newData: fetchedAdvertisementData, currentData: advertisementData }),
        concat(advertisementData),
        setAdvertisementData
      )(Array(INCREASE_ITEM_SIZE))

      setFetchLoading(false)
    }
  }, [isFetchLoading, postData, setPostData, advertisementData, setAdvertisementData])

  useEffect(() => {
    const interval = setInterval(fetchData, 100);
    return () => clearInterval(interval);
  }, [isFetchLoading, fetchData]);

  return (
    <AppContainer>
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
    </AppContainer>
  )
}

export default Feeds;
