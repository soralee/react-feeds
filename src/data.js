import map from 'lodash/map'; 
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
    message: "Introduce to my github!\n\nhere: https://github.com/soralee/react-timeline\n\nCome and see my project! :)"
  },
  {
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
    id: 3,
    type: feedTypes.video,
    created_at: 1464231447907,
    owner: {
      name: "bori",
      image: "/images/cat1.jpeg",
    },
    message: "Welcome to Classting!"
  },
]

const getDummyData = () => (
  map(Array(10), (_, id) => ({ ...mock_data[id % 3], id }))
)

const response = {
  data: getDummyData(),
}
export default response;