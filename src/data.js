import map from 'lodash/map'; 
import keys from 'lodash/keys'; 
import feedTypes from "./util/feedTypes";

export const mock_post_data = {
  0: {
    id: 0,
    type: feedTypes.share,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Hi there :)"
  },
  1: {
    id: 1,
    type: feedTypes.share,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Introduce to my github!\n\nhere: https://github.com/soralee/react-feeds\n\nCome and see my project! :)"
  },
  2: {
    id: 2,
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
        url: "/images/soraman-bori.png"
      },
      {
        id: "image-2",
        url: "/images/cat-developers.jpg"
      }
    ]
  },
  3: {
    id: 3,
    type: feedTypes.video,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Stay tuned!",
    video: "http://media.w3.org/2010/05/bunny/movie.mp4"
  },
  4: {
    id: 4,
    type: feedTypes.image,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "yoyo",
    images: [
      {
        id: "matthew-1",
        url: "https://react.semantic-ui.com/images/avatar/large/matthew.png"
      }
    ]
  },
}

export const mock_advertisement = {
  0: {
    type: feedTypes.image,
    privacy: "Sponsored",
    created_at: 1464231447907,
    owner: {
      name: "Cat world",
      image: "/images/soraman-bori.png",
    },
    message: "She is a famous cat!",
    ad_message: "We have more cute and awesome pictures :)",
    images: [
      {
        id: "image-1",
        url: "/images/cat1.jpeg"
      },
    ]
  },
  1: {
    type: feedTypes.video,
    privacy: "Sponsored",
    created_at: 1464231447907,
    owner: {
      name: "Movie world",
      image: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    },
    message: "The best movie in this year!",
    ad_message: "WE have more vedios! click me if you want ;)",
    video: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  }
}

export const getPostDummyData = () => {
  const keyList = keys(mock_post_data)

  return map(Array(10), (_, id) => {
    const objectKey = keyList[id % 5];
    return ({ ...mock_post_data[objectKey], id })
  })
}

export const getAdvertisementDummyData = () => {
  const keyList = keys(mock_advertisement)

  return map(Array(10), (_, id) => {
    const objectKey = keyList[id % 2];
    return ({ ...mock_advertisement[objectKey], id })
  })
}
