import map from 'lodash/map'; 
import keys from 'lodash/keys'; 
import feedTypes from "./util/feedTypes";

const mock_data = [
  {
    id: 1,
    type: feedTypes.share,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Hi there :)"
  },
  {
    id: 2,
    type: feedTypes.share,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Introduce to my github!\n\nhere: https://github.com/soralee/react-feeds\n\nCome and see my project! :)"
  },
  {
    id: 3,
    type: feedTypes.image,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Welcome to Cat world!",
    images: [
      {
        id: "image-1",
        url: "/images/cat1.jpeg"
      },
      {
        id: "image-2",
        url: "/images/soraman-bori.png"
      },
      {
        id: "image-3",
        url: "/images/cat-developers.jpg"
      }
    ]
  },
  {
    id: 4,
    type: feedTypes.video,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Stay tuned!",
    video: "http://media.w3.org/2010/05/bunny/movie.mp4"
  },
  {
    id: 5,
    type: feedTypes.share,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "yoyo"
  },
]

const mock_advertisement = {
  1: {
    type: feedTypes.image,
    privacy: "Sponsored",
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "She is a famous cat!",
    images: [
      {
        id: "image-1",
        url: "/images/cat1.jpeg"
      },
      {
        id: "image-2",
        url: "/images/soraman-bori.png"
      },
    ]
  },
  2: {
    type: feedTypes.video,
    privacy: "Sponsored",
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "The best movie in this year!",
    video: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  }
}

const getDummyData = () => (
  map(Array(10), (_, id) => ({ ...mock_data[id % 5], id }))
)

export const getAdvertisementDummyData = () => {
  const keyList = keys(mock_advertisement);

  return map(Array(10), (_, id) => {
    const objectKey = keyList[id % 2];
    return ({ ...mock_advertisement[objectKey], id })
  })
}

export const response = {
  data: getDummyData(),
}